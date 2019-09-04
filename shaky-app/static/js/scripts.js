var shaky = (function() {
  var init = function () {
    console.log('init');
  }

  var searchIngredient = function () {

    $('#searchInput').keyup(function() {
      var input, filter, form, p, label, i;
      input = $('#searchInput');
      filter = input.val().toUpperCase();
      form = $("#ingredientForm");
      p = form.find('p');

      // Loop through all list items, and hide those that don't match the search query
      for (i = 0; i < p.length; i++) {
          label = p[i].getElementsByTagName("label")[0];
          if (label.innerHTML.toUpperCase().indexOf(filter) > -1) {
              p[i].style.display = "";
          } else {
              p[i].style.display = "none";
          }
      }
    });

  }

  var clearSelection = function () {
    $(".ingredient-list input:checkbox").each(function(){
      if($(this).prop('disabled')!=true) {
        $(this).prop('checked', false);
      }
    });
  }

  // Public API
  return {
    init: init,
    searchIngredient: searchIngredient,
    clearSelection: clearSelection
  };
})();

$(document).ready(function () {
  shaky.init();
  shaky.searchIngredient();
});
