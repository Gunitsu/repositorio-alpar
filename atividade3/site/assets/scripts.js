function toggleVideo(videoId) {
    var video = document.getElementById(videoId);
    if (video) {
      //Oculta todos os vídeos
      var videos = document.querySelectorAll('video');
      videos.forEach(function(video) {
        video.style.display = 'none';
      });
  
      //Exibe o vídeo correspondente ao vídeoId
      video.style.display = 'block';
    }
  }

  function selectSkin(skinName) {
    //Atualiza a imagem da skin atual com a nova skin selecionada
    document.getElementById('current-skin-img').src = 'images/' + skinName;
  }
  