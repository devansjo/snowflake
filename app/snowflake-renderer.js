import $ from 'jquery';
import _ from 'lodash';

$.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

const defaultOptions = {
    name: 'Your Name',
    arms: 6,
    max_font: 200,
    min_font: 6,
    arm_length: 256,
};

export default function buildSnowflake($target, options) {

    _.defaults(options, defaultOptions);

    $('.arm').remove();

    const name_text = options.name.length > 0 ? options.name : defaultOptions.name;
    const chars = [];

    for(let t = 0; t < name_text.length; t++) {
        const char = name_text.substr(t, 1);

        // step between the max and min font sizes
        const font_size = options.max_font - (((options.max_font - options.min_font) / name_text.length) * t);

        // space the fonts over the 'branch'
        const font_width = options.arm_length / name_text.length;

        // distance on 'branch'
        const font_left = (options.arm_length / name_text.length) * t;

        chars.push({ char, font_size });

    }

    const arm = chars.map((char) => {
        return `<div class="char" style="font-size: ${char.font_size}px">${char.char}</div>`;
    }).join('');

    const primary_arm = `
    <div class="arm rotate_pin" id="arm_0">
        <div class="text_holder top">"${arm}</div>
        <div class="text_holder bottom">"${arm}</div>
    </div>
    `;

    $target.append(primary_arm);
    $('#snowflake').append(primary_arm);

    // already made arm 0, just clone it into the remaining arms
    for(var i = 1; i < options.arms; i++) {
        var new_arm = $('#arm_0').clone();
        new_arm.attr('id',' arm_' + i).rotate((360/options.arms) * i);
        $target.append(new_arm);
        $('#snowflake').append(new_arm);
    }

    $('.poster_framed_1_snowflake').html($target.clone().attr("class", "snowflake_static_1").attr("id", "").css({ 'color' : '#' + options.text_colour }) );
    $('.poster_framed_1_text').html("the snowflake of " + options.name);
    $('.mockup, .card_front').css( { 'background-color' : '#' + options.background_colour });
    $('.snowflake_static_1 div').css( { 'color' : '#' + options.text_colour });
    $('.poster_framed_1_text').css( { 'color' : '#' + options.text_colour });

    // Copy styles and content into the static snowflake builder page
    $('#snowflake_background').css({ 'background-color' : '#' + options.background_colour });
    $('#snowflake_background #snowflake_maker #snowflake_holder div').css({ 'color' : '#' + options.text_colour });
    $('#name_text').html("the snowflake of " + options.name).css({ 'color' : '#' + options.text_colour });

}
