(function ($) {
    $.fn.visible = function (isVisible) {

        if (isVisible) {
            return this.each(function () {
                $(this).css("visibility", "visible");
            });
        }

        else {
            return this.each(function () {
                $(this).css("visibility", "hidden");
            });
        }

    };
}(jQuery));