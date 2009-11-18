/**
 * jQuery Form Input Placeholder Plugin
 *
 * Inserts the specified ghost text into input boxes, helping show the user
 * what to enter.
 *
 * Example:
 *
 *  $("input#search-query").placeholder("Enter search terms");
 *
 * The MIT License
 *
 * Copyright (c) 2009 Steve Purcell (steve@sanityinc.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @param		String
 * @param		Array
 * @return		jQuery
 */
(function($) {
   $.fn.placeholder = function(placeholder, options) {
     options = $.extend({}, $.fn.placeholder.defaults, options);
     var has_value = function(value) {
       return function() {
         return $(this).val() == value;
       };
     };
     var maybe_set_placeholder = function() {
       $(this).filter(has_value("")).val(placeholder).addClass(options.flagClass);
     };
     var maybe_unset_placeholder = function($el) {
       $(this).filter(has_value(placeholder)).val("").removeClass(options.flagClass);
     };
     return this
       .focus(maybe_unset_placeholder)
       .blur(maybe_set_placeholder)
       .each(maybe_set_placeholder)
       .closest("form").submit(function() {
                                 $(this).find("input." + options.flagClass).each(maybe_unset_placeholder);
                               })
       .end();
   };

   $.fn.placeholder.defaults = {
     flagClass: 'placeholder' // A marker CSS class applied when the placeholder is being shown
   };

})(jQuery);
