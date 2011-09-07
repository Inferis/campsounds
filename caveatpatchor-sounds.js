// include this script into your Propane's caveatpatchor.js to add support for /sound sounds. ;)


var playSounds = true;
var soundRepoURL   = "http://github.com/Inferis/campsounds/blob/master/sounds/";

if (playSounds) {

    Campfire.SoundPlayer = Class.create({
      initialize: function(chat) {
      },

      urlExists: function(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
      },

      detectSound: function(message) {
        /* we are going to use the messageID to uniquely identify our requestJSON request
        so we don't check pending messages */
        if (!message.pending() && message.kind === 'text') {
          text = message.bodyElement().innerText;
          if ((match = text.match(/^\/sound\s+(.+)/))) {
            var url = soundRepoURL + match[1] + ".wav?raw=true";
            alert(url);
            // var sound = "";
            // if (this.urlExists(url)) {
               sound = url;
            //}
            alert(sound);
            if (sound) {
              var snd = new Audio(sound);
              snd.play();
            }
          }
        }
      },

    onMessagesInsertedBeforeDisplay: function(messages) {
      for (var i = 0; i < messages.length; i++) {
        this.detectSound(messages[i]);
      }
    },

    onMessageAccepted: function(message, messageID) {
      this.detectSound(message);
    }
  });

  Campfire.Responders.push("SoundPlayer");
  window.chat.installPropaneResponder("SoundPlayer", "soundplayer");
}
