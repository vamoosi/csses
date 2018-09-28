// ==UserScript==
// @name         NCL Base Namer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include        https://www.lioden.com/claiming.php?*
// @grant        none
// ==/UserScript==

var baseList = document.getElementById('claiming-biome').firstElementChild.innerHTML;
var claimClass = document.getElementsByTagName('h1');
var uncommon = ["korat","maltese","onyx","clearwhite","russet","xanthic","topaz","sunshine"];
var rare = ["slate","cocoa","chartreux","ebony","flint","ashen","cameo","buff","amber","buttercream","buttermilk","teardrop","dinar","fulvous","nacarat","champagne","udara","goldenrod","sulphur","prune","anjeer","fiery","maroon","shedua","umber","cinnabar","sapela"];
var special = ["celestial","divine","ice","penumbra","arctic","hematite","moonstone","sidereal","opal","glacial","pulsar","skyward","soul","haze","interstellar","nuumite","lilac","cairngorm","arabica","nacre","olive","supernal","asiatic","fossil","hallowed","cherryblossom","ethereal","ivory","hellebore","qahir","pearl","ruffian","solaris","anubis","asali","kimanjano","bast","dhahabi","citrine","trophy","chatoyant","gilded","green","labradorite","mobola","madagascar","rhodonite","unholy","sunset","inferno","blazing","fuchsia","sunrise","manakbir","bloodbourne","blackrose","blushrose","sepia","seth","ardor","orchid"];
var getFromBetween = {
    results:[],
    string:"",
    getFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1)+sub1.length;
        var string1 = this.string.substr(0,SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP,TP);
    },
    removeFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
        this.string = this.string.replace(removal,"");
    },
    getAllResults:function (sub1,sub2) {
        // first check to see if we do have both substrings
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        var result = this.getFromBetween(sub1,sub2);
        // push it to the results array
        this.results.push(result);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1,sub2);

        // if there's more substrings
        if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1,sub2);
        }
        else return;
    },
    get:function (string,sub1,sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1,sub2);
        return this.results;
    }
};
var baseName = getFromBetween.get(baseList,"bases/",".png");
if (uncommon.includes(baseName) === true) {
    baseName += ' (uncommon)';
} else if (rare.includes(baseName) === true) {
    baseName += ' (rare)';
} else if (special.includes(baseName) === true) {
    baseName += ' (special)';
} else {
    baseName += ' (common)';
}
claimClass[0].innerHTML += ' (' + baseName + ')';
