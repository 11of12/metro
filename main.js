SILENT = 0;
STRONG = 1;
WEAK = 2;
SUBDIVISION = 3;

DEFAULT_TEMPO = 60.0;

var metro = {
    metronome_start: async function() {
        tempo = metro.tempo;
        metro.internal.delay_ms = 1000.0 * 60.0 / tempo;
        metro.metronome_running = true;
        while(metro.metronome_running){
            if (metro.tempo != tempo) {
                tempo = metro.tempo;
                metro.internal.delay_ms = 1000.0 * 60.0 / tempo;
            }
            click_weight = metro.internal.get_next_weight(metro.internal.active_pattern)
            if (click_weight == SILENT) {
            }
            else if (click_weight == STRONG) {
                metro.internal.sounds.click_strong.play()
            }
            else if (click_weight == WEAK) {
                metro.internal.sounds.click_weak.play()
            }
            else if (click_weight == SUBDIVISION) {
                console.log("not implemented")
            }
            else {
                console.log("not implemented")
            }

            await metro.internal.sleep(metro.internal.delay_ms)
        }
    },
    metronome_stop: function() {
        metro.metronome_running = false;
    },

    patterns: {
        three_four: [STRONG, WEAK, WEAK],
        four_four: [STRONG, WEAK, WEAK, WEAK],
    },
    tempo: DEFAULT_TEMPO,
    metronome_running: false,

    internal: {
        delay_ms: 1000.0 * 60.0 / DEFAULT_TEMPO,
        current_position: 0,
        active_pattern: 'four_four',
        sounds: {
            click_strong: new Audio('audio_files/click_strong.wav'),
            click_weak: new Audio('audio_files/click_weak.wav')
        },
        sleep: function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        get_next_weight: function(pattern_key) {
            length = metro.patterns[pattern_key].length
            weight = metro.patterns[pattern_key][metro.internal.current_position];
            console.log(metro.internal.current_position)
            metro.internal.current_position = (metro.internal.current_position + 1) % length
            return weight
        },
        change_pattern: function(pattern_key) {
            metro.internal.current_position = 0;
            metro.internal.active_pattern = pattern_key;
        }
    },
}



