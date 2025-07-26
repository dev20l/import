$("#search").on("click", function(){
    let username = $("input[placeholder='Enter Username']").val().trim();

    if(username === "") {
        return;
    }

    $("#search").html(`<i class="fa-solid fa-spinner fa-spin"></i>`);

    $.ajax({
        url: `https://theclassicswing.com/api/picture.php?username=${username}`,
        method: "GET",
        success: function(response) {
            $("#search").html("search");

            if(response["Found"] && response["Found"] === "OK") {
                $(".profile").removeClass("d-none");
                $(".profile .name").text(response["full_name"] || "No Name");
                $(".profile .img img").attr("src", response["user_avatar"] || "");
                $(".profile .username").text("@" + (response["user_name"] || username));
            }
        },
        error: function() {
            $("#search").html("search");
        }
    });
});
