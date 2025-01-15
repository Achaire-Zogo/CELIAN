(function(){
    var navItems = document.getElementsByClassName("nav-link");

    var sep = document.location.href.split("/");
    var first = sep[sep.length - 2];
    var second = sep[sep.length - 1];


    for(let i = 0; i < navItems.length; i++)
    {
        let e = navItems[i];

        var e_sep = e.href.split("/");
        var e_first = e_sep[e_sep.length - 2];
        var e_second = e_sep[e_sep.length - 1];

        if(first == e_first && second == e_second)
        {
            if(e.classList.contains("collapsed"))
            {
                e.classList.remove("collapsed");
            }
        }
        else
        {
            if(!e.classList.contains("collapsed"))
            {
                e.classList.add("collapsed");
            }
        }


    }
})();