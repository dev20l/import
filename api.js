     $("#search").on("click", async function () {
    let username = $("input[placeholder='Enter Username']").val().trim();

    if (username === "") {
        return;
    }

    $("#search").html(`<i class="fa-solid fa-spinner fa-spin"></i>`);
    $(".username").text(username);

    try {
        const res = await fetch("https://users.roproxy.com/v1/usernames/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usernames: [username],
                excludeBannedUsers: true
            }),
        });

        const data = await res.json();

        if (!data.data || data.data.length === 0) {
            throw new Error("User not found");
        }

        const userId = data.data[0].id;
        const userName = data.data[0].name;

        const avatarRes = await fetch(
            `https://thumbnails.roproxy.com/v1/users/avatar?userIds=${userId}&size=150x150&format=Png&isCircular=false`
        );
        const avatarData = await avatarRes.json();
        const avatarUrl = avatarData.data[0].imageUrl;

        $("#search").html("search");

        $(".profile").removeClass("d-none");
        $(".profile .name").text(userName || "No Name");
        $(".profile .img img").attr("src", avatarUrl || "");
        $(".profile .username").text("@" + (userName || username));

    } catch (error) {
        console.error(error);
        $("#search").html("search");
        showUsernameOnly(username);
    }
});

function showUsernameOnly(username) {
    $(".profile").removeClass("d-none");
    $(".profile .name").text("No Name");
    $(".profile .img img").attr("src", "");
    $(".profile .username").text("@" + username);
}
