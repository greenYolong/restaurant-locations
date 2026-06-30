# This project is a technical test for the GEOPTIS society. 

In this document, I will provide some intel about how or why this project has been created the way it is at the moment.


This project will be divided in three main tasks.

First thing to do will be to create the restaurant database with PostgreSQL in order to ensure that the CHECK constraint for the latitude and longitude are respected, even if the API fail. This way, the double check ensure the correct behavior.

The logical consequence to the database creation is to build a minimal backend with the requested endpoint. To make things easier at the beginning, those endpoints will be static, then we can change to something responsive with the database as the tests go. 
The endpoints will be the following, as requested:
o POST /api/restaurants - Adding a new restaurant
o GET /api/restaurants - listing all the restaurants
o GET /api/restaurants/search?q=term - Searching for restaurants
o GET /api/restaurants/filter?cuisine=type - Filter by cuisine type.

Alongside the creation of the latter endpoints, the backend must be implemented so it respects the rules requested by the test: the field length, the bounds for latitude and longitude...
This way, we ensure that even though we send data through the frontend we shouldn't, the API still send us the correct answer. The error feedback from the API will have a lot of value for this project.

Finally, the frontend will be the last task, as it is the easiest thing to implement when the API is well-defined. In the end, all I'll have to do is to implement the table, the display for the restaurant list and the filters and search bar.


# Sources

As I was developping this application, I obvioulsy needed to check on some documentation and some example to ensure I was not doing anything wrong.

The backend wasn't much of a difficulty as I was very familiar with JavaScript since every project I took part in used JS at some point. Also the architecture I used is the classic backend structure one can use for any project, so it didn't change much from my last projects. If any thing new, it was the configuration of the local Express and PosqtgreSQL I had to install. 
Source wise, I jsut needed some reminders on JS so just the JavaScript documentations was enough (mainly for interacting with the database):
 - https://devdocs.io/javascript/
 - https://developer.mozilla.org/en-US/docs/Web/JavaScript
 - https://expressjs.com/en/guide/routing/
 - https://docs.npmjs.com/
 - https://github.com/npm/npm/issues/9161
 - https://expressjs.com/en/5x/guide/error-handling/


The frontend on the other hand was fairly new to me since I've never used Vue.js before this project. 
The main difficulty was to correctly setup the Vue project because I didn't know what I was going to need so I had to make a few tests before really starting on a fresh start. Once I got used to the syntax, things got rolling pretty fast since it was pretty much the same all along and also the file I had to write wasn't that long. I also statrted with the most difficult thing: the form for adding a new restaurant as it is the most complete and I had to take a few hour on it just to figure things out. 
So of course I had to search a bit more on how things work in Vue, fetch some documentation and examples online:
 - https://vuejs.org/guide/quick-start.html
 - https://test-utils.vuejs.org/guide/
 - https://github.com/shenjianZ/vue-docs-ui
 - https://softauthor.com/vue-js-3-composition-api-reusable-scalable-form-validation/
 - https://vueschool.io/articles/vuejs-tutorials/v-model-and-definemodel-a-comprehensive-guide-to-two-way-binding-in-vue-js-3/
 - https://vuejs.org/guide/components/events.html
 - https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/valid-define-props.md
 - https://dev.to/cn-2k/working-with-emits-in-vue-3-typescript-2a1j
 - https://vuejs.org/api/sfc-css-features.html


I of course used more but that's for the most interesting documentation and example I had to look up in order get some new intel, or just a heads up.


# IA usage

As you can / will be able to tell, some of the code present in this project has been IA generated, and since there is no point in hiding it, I will dicuss this matter in this section.

First things first, the IA I used is [Perplexity](https://www.perplexity.ai/), based on the Sonar model.

As I said earlier, the backend wasn't much of a challenge so for this part I didn't had to resort to IA for the development. However, I sometimes encounter some error I had no idea how to fix and used a few time IA to debug the latter issues. In the end, the backend setup and occasional debug are the only time I used IA.

On the other hand, the frontend was a lot more interesting as I had to learn a new langague (Vue.js) to develop this app. The first thing I did was of course checking for some tutorial and documentation on tue Vue website, but sometimes I needed things to be a bit more accurate to fit my needs, so asked for IA a more precise example, or just a lesson/toturial that could leads me a better than just the official documentation or the forum (git, stackoverflow...). Also there is one thing I used IA for: the `defineProps` and `defineEmits` as I could not code something even close to what I needed. That is pretty much all for the IA usage for the frontend.

Last things I used IA for is the css architecture to avoid duplicated code, and more generally just to gain some time at the end of the project since css really is time demanding and I was running out of it. So the main theme of the application has been IA generated, but I still "spread" the theme throughout the application.


# Conclusion

I hope this project fits the needs for this application. For the documentation I tried to make the best I could but ended up lacking time so it is (sadly) the minimal thing I could have done, I still hope that the code is clear enough. 
I have been completly honest IA-wise since I was allowed to use it, so it has been used like any other tool I had at my disposal, not so few but more important not to much.

If any question feel free to ask me anything, even open an issues on github. 