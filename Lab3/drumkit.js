document.addEventListener('DOMContentLoaded', function () {
    const drumKit = document.getElementById('drumkit');
    const recordBtn = document.getElementById('recordBtn');
    const playBtn = document.getElementById('playBtn');
    let isRecording = false;
    let recordedSounds = { kick: [], snare: [], hihat: [] };

    drumKit.addEventListener('click', function (event) {
        const sound = event.target.dataset.sound;
        if (sound) {
            playSound(sound);
            if (isRecording) {
                recordedSounds[sound].push(Date.now());
            }
        }
    });

    recordBtn.addEventListener('click', function () {
        isRecording = !isRecording;
        if (isRecording) {
            recordedSounds = { kick: [], snare: [], hihat: [] };
        }
    });

    playBtn.addEventListener('click', function () {
        playRecordedSounds();
    });

    function playSound(sound) {

        console.log(`Playing sound: ${sound}`);
    }

    function playRecordedSounds() {
        Object.keys(recordedSounds).forEach(function (sound) {
            recordedSounds[sound].forEach(function (timestamp, index) {
                setTimeout(function () {
                    playSound(sound);
                }, timestamp - recordedSounds[sound][0]);
            });
        });
    }
});
