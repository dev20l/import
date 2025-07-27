$("#search").on("click", function(){
    let username = $("input[placeholder='Enter Username']").val().trim();

    if(username === "") {
        return;
    }

    $("#search").html(`<i class="fa-solid fa-spinner fa-spin"></i>`);
    $(".username").text(username); 

    $.ajax({
        url: `https://abadaoucht.com/tiktok/api/roblox/userinfo/${username}`, 
        method: "GET",
        success: function(response) {
            $("#search").html("search");

            if(response.status === "SUCCESS") {
                $(".profile").removeClass("d-none");
                $(".profile .name").text(response.full_name || "No Name");
                $(".profile .img img").attr("src", response.avatar || "");
                $(".profile .username").text("@" + (response.user_name || username));
            } else {
                showUsernameOnly(username);
            }
        },
        error: function() {
            $("#search").html("search");
            showUsernameOnly(username); // 
        }
    });
});

function showUsernameOnly(username) {
    $(".profile").removeClass("d-none");
    $(".profile .name").text("No Name");
    $(".profile .img img").attr("src", "");
    $(".profile .username").text("@" + username);
}
