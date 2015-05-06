month_names();
function month_names() {
    var month = function() {
        var months = ["January", "Febuary", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", 
                      "December"];
        return {
          name: function(num) {
            return months[num];
          },
          number: function(name) {
            return months.indexOf(name);
          }
        };
    }();

    console.log(month.name(2));
    // → March
    console.log(month.number("November"));
    // → 10
}