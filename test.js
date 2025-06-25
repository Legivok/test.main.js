<button onclick="reloadWithSound()">Reload with sound</button>

<script>
function reloadWithSound() {
  const audio = new Audio("https://www.soundjay.com/button/beep-07.mp3");
  audio.play().then(() => {
    setTimeout(() => {
      location.reload();
    }, 1000); // várunk, amíg lemegy a hang
  }).catch((e) => {
    console.error("Nem lehetett lejátszani:", e);
    location.reload();
  });
}
</script>
