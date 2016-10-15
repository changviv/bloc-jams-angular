(function () {
    function PlayerBarCtrl(Fixtures, Songplayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }
    
    angular 
        .module('blocJams')
        .controller('PlayerBarCtrl', ['Fixtures', 'Songplayer',PlayerBarCtrl]);
})();