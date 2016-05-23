(function($, window, document) {
    'use strict';

    $(document).ready(function() {

        quiz.init('.pf-content');

    });


    ////////////////////////////////////
    //
    // Quiz Class
    //
    ///////////////////////////////////

    var quiz = {};

    quiz.container = null;
    quiz.title = null;
    quiz.template = {
        master: '<div id="quiz-questions">{{quiz-questions-wrapper}}</div><div id="quiz-answers">' +
            '<a id="{{results-id}}" name="{{results-id}}"></a>{{quiz-answer-wrapper}}</div>',

        choices: '<div class="radio"><label><input type="radio" id="id-quiz-option-{{parent_index}}" name="quiz-option-{{parent_index}}" value="{{quiz_answer_value}}" />{{quiz_answer_text}}</label></div>',

        form: "<form class=\"form-horizontal\">{{content}}</form>",
    };

    quiz.lines = null;
    quiz.categories = null;

    quiz.init = function(container, title) {

        this.container = $(container);

        this.handlers();

        this.render.parent = this;
        this.util.parent = this;

        // build form
        
        this.render.form();

    };

    quiz.handlers = function() {

    
    };

    quiz.render = {

        form: function() {
            var html = this.parent.util.renderHTML([
                    ['content', $(this.parent.container).html()]
                ],
                this.parent.template.form);

            $(this.parent.container).html(html);

            $('.form-horizontal').append('<button type="submit" class="btn btn-success btn-lg">Find out now!</button>');

            this.questions();
            this.results();
        },

        questions: function() {

            this.parent.lines = $(this.parent.container).find('.question-categories');
            this._categories(this.parent.lines);

        },
        buttons: function() {

        },
        _categories: function(uls) {
            var thisParent = this.parent;
            var dis = this;

            var i = 0;

            $(uls).each(function(i) {

                dis._category($(this), i); //ol

            });

        },
        _category: function(dis) {
            var thisParent = this.parent;
            var disClass=this;

            $(dis).find('li').each(function(i) {

               disClass._question($(this), i); //ol li

            });
            

        },
        _question: function(dis, category_index) {
            var thisParent = this.parent;
            var disClass = this;
            var i = 0;

            
            $(dis).find('ul').each(function(i) {

                disClass._answers($(this), i, category_index); // ol li ul

            });

        },
        _answers: function(dis, choices, category_index) {
            var thisParent = this.parent;
            var disClass = this;
            var i = 0;

            $(dis).css('list-style-type', 'none').css('margin', '0').css('padding', '0').css('margin', '1.5em 0');
            $(dis).find('li').each(function(i) {

                disClass._answer($(this), i, category_index); // ol li ul li

            });

        },
        _answer: function(dis, choicesIndex, li_index) {
            var thisParent = this.parent,
                answer, arrData;
                var disClass = this;
            var renderedHTML = "";
            var i = 0;
            var str = $(dis).html();

            answer = '0';

            if ($(dis).attr('data-answer')) {
                answer = $(dis).attr('data-answer');
            }

           // console.log(str);


            arrData = [
                ['quiz_answer_text', str],
                ['parent_index', li_index],
                ['quiz_answer_value', answer],

            ];

            //console.log(arrData);
            renderedHTML = thisParent.util.renderHTML(arrData, thisParent.template.choices);

            //console.log(renderedHTML);
            $(dis).html("");
            $(dis).html(renderedHTML);



        },
        results: function() {




        }

    };


    quiz.util = {

        renderHTML: function (data, pattern) {

            var rendered = pattern;

            $.each(data, function(k, v) {

                rendered = rendered.replace(new RegExp("{{" + v[0] + "}}", "gm"), v[1]);

            });

            return rendered;

        }

    };


}(jQuery, window, document));