(function(){
    function load(){
        return {a:a(),b:b()};
    }
    function a(){
        return "a";
    }
    function b(){
        return "b";
    }
    window._ = load();
})();