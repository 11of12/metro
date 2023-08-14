async function load_time_signatures(time_signature) {
    const response = await fetch ('time_signatures.json');
    const data = await response.json();
    return data.time_signatures;
}

async function get_time_signatures() {
    let time_signatures = await load_time_signatures();
    return time_signatures;
}

//function generate_pattern(time_signature) {
//    return [1, 1, 1, 1]
//}
//
//function generate_pattern_subdivided(time_signature) {
//    return [1, 2, 2, 1, 2, 2, 1, 2, 2]
//}

export function Metronome(time_signature, beats_per_minute, subdivided) {
    this.is_running = false;
    this.subdivided = subdivided;
    this.click_strong = new Audio('audio_files/click_strong.wav');
    this.click_weak = new Audio('audio_files/click_weak.wav');
    this.beats_per_minute = beats_per_minute;

    this.init = async () => {
        this.time_signatures = await get_time_signatures();
        this.time_signature = this.time_signatures[time_signature];
    };

    // Call the init method to asynchronously initialize the object
    this.init();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function metronome_start(metronome) {
    let STRONG_BEAT = 1;
    let WEAK_BEAT = 2;

    let pattern = []
    let position = 0;
    let delay_ms = 0;
    let beats_per_minute = metronome.beats_per_minute;

    if (metronome.subdivided) {
        let subdivisions_per_beat = metronome.time_signature['subdivisions_per_beat'];
        delay_ms = 1000 * 60 / beats_per_minute / subdivisions_per_beat;
        pattern = metronome.time_signature['subdivision_pattern'];
    } else {
        delay_ms = 1000 * 60 / beats_per_minute;
        console.log(metronome.time_signature['num_beats']);
        for (let i = 0; i < metronome.time_signature['num_beats']; i++) {
            pattern.push(STRONG_BEAT);
        }
    }

    console.log("Made it Here")
    metronome.is_running = true
    console.log(pattern);


    while (metronome.is_running) {
        position  = (position + 1) % pattern.length;

        if (pattern[position] == STRONG_BEAT) {
            await metronome.click_strong.play()
        }
        if (pattern[position] == WEAK_BEAT) {
            await metronome.click_weak.play()
        }
        await sleep(delay_ms);
    }
}

export async function metronome_stop(metronome) {
    metronome.is_running = false;
}
