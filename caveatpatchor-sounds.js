// include this script into your Propane's caveatpatchor.js to add support for /sound sounds. ;)


var playSounds = true;
var soundRepoURL   = "http://github.com/Inferis/campsounds/blob/master/sounds/";

if (playSounds) {

    Campfire.SoundPlayer = Class.create({
      initialize: function(chat) {
      },

      urlExists: function(url) {
        // TODO
        return true;
      },

      detectSound: function(message) {
        var match, url, sound, text;

        if (message.pending()) return;
        if (!message.kind === "text") return;

        text = message.bodyElement().innerText;
        if (!(match = text.match(/^\/sound\s+(.+)/))) return;

        url = soundRepoURL + match[1] + ".wav?raw=true";
        if (this.urlExists(url)) sound = url;
        if (!sound) return;

        var snd = new Audio(sound);
        snd.play();
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
