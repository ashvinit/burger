// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $.ajax("/burgers", {
        type: "GET"
    }).then(function (data) {
        var uneatenElem = $("#uneaten");
        var eatenElem = $("#eaten");

        var burgers = data.burgers;
        var len = burgers.length;
        console.log(burgers, len);

        for (var i = 0; i < len; i++) {
            console.log(!burgers[i].devoured);
            var new_elem =
                "<li class='burger-item'>" +
                burgers[i].burger_name +
                "<div><button class='change-devoured' style='color: #FF1493;' data-id='" +
                burgers[i].id +
                "' data-devoured='" +
                !burgers[i].devoured +
                "'>";

            if (burgers[i].devoured) {
                new_elem += "One More?";
            } else {
                new_elem += "Devour It!";
            }

            new_elem += "</button>";

            new_elem +=
                "<button class='delete-burger' style='color: #FF1493;' data-id='" +
                burgers[i].id +
                "'>DELETE!</button></div></li>";

                console.log(new_elem);

            if (burgers[i].devoured) {
                eatenElem.append(new_elem);
            } else {
                uneatenElem.append(new_elem);
            }
        }
    });

    $(document).on("click", ".change-devoured", function (event) {
        var id = $(this).data("id");
        var newDevoured = $(this).data("devoured");

        var newDevouredState = {
            devoured: newDevoured
        };

        // Send the PUT request.
        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: JSON.stringify(newDevouredState),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("changed devoured to", newDevoured);
            // Reload the page to get the updated list
            location.reload();
        });
    });

    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burger_name: $("#ca")
                .val()
                .trim(),
            devoured: $("[burger_name=devoured]:checked")
                .val()
        };

        // Send the POST request.
        $.ajax("/burgers", {
            type: "POST",
            data: JSON.stringify(newBurger),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function () {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
        });
    });

    $(document).on("click", ".delete-burger", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/burgers/" + id, {
            type: "DELETE"
        }).then(function () {
            console.log("deleted burger", id);
            // Reload the page to get the updated list
            location.reload();
        });
    });
});
