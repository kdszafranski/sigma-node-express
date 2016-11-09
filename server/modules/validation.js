function checkEmpty(newSong) {
  console.log('checking empty');
  if(newSong == null || newSong == undefined) {
    return true;
  }
  if(newSong.title == "" || newSong.artist == "") {
    return true;
  }

  return false;
}

function checkDuplicate(songList, newSong) {
  console.log('checking dupes');
  for (var i = 0; i < songList.length; i++) {
    if(songList[i].title == newSong.title && songList[i].artist == newSong.artist) {
      console.log('duplicate');
      return true;
    }
  }

  return false;
}

module.exports.checkEmpty = checkEmpty;
module.exports.checkDuplicate = checkDuplicate;
