(function() {
    function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};
/**
* @function currentAlbum
* @desc returns albumPicasso
*/               
    var currentAlbum = Fixtures.getAlbum();    
/**
* @desc Buzz object audio file
* @type {Object}
*/        
    var currentBuzzObject = null;
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/

    var setSong = function(song) {
        if(currentBuzzObject) {
           stopSong(song);
        }
        
        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });
        
        currentBuzzObject.bind('timeupdate', function() {
            $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
            });
        });
        
        SongPlayer.currentSong = song;
    };
/**
* @function playSong
* @desc plays currentBuzzObject's audio file
* @param {Object} song
*/    
    var playSong = function(song) {
        currentBuzzObject.play();
        song.playing = true;
    };        
/**
* @function stopSong
* @desc Stops currently playing song
* @param {Object} song
*/
    var stopSong = function(song) {
        currentBuzzObject.stop();
        song.playing = null;
    };        
        
    var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
    };    
/**
* @desc Active song object from list of songs
* @type {Object}
*/        
    SongPlayer.currentSong = null;
/**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */        
    SongPlayer.currentTime = null;  
/**
 * @function volume
 * @desc set the volume
 * @param {Object} value
 */    
    SongPlayer.volume = function(volume) {
        if (currentBuzzObject) {
            currentBuzzObject.setVolume(volume);
        }
    } ;  
 /**
 * @function play
 * @desc Play current or new song
 * @param {Object} song
 */
    SongPlayer.play = function(song){
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
            setSong(song);
            playSong(song);
        } else if (SongPlayer.currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                currentBuzzObject.play();
            }
        }   
    };
 /**
 * @function pause
 * @desc Pause current song
 * @param {Object} song
 */        
    SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
    };
/**
 * @function previous
 * @desc play previous song
 * @param function
*/ 
    SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currnetSongIndex--;
        
        if(currentSongIndex < 0) {
            stopSong(song);
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    };
/**
* @function next
* @desc play next song
* @param function
*/         
    SongPlayer.next = function () {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currnetSongIndex++;
        
        if(currentSongIndex == (currentAlbum.songs.length - 1)) {
            stopSong(song);
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    }; 
        
/**
* @function setCurrentTime
* @desc Set current time (in seconds) of currently playing song
* @param {Number} time
*/         
    SongPlayer.setCurrentTime = function(time) {
        if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
        }
    };    
    
        
    return SongPlayer;
}
    
    angular 
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures,', SongPlayer]);
})();