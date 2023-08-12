import {Metronome, metronome_start, metronome_stop} from './metronome.js';

async function main() {
    let metronome = await new Metronome('Four_Four', 60, false);

    const metronome_start_button = document.getElementById('metronome_start_button');
    const metronome_stop_button = document.getElementById('metronome_stop_button');
    const metronome_subdivided_button = document.getElementById('metronome_subdivided_button');
    const time_signature_select = document.getElementById('time_signature_select');

    time_signature_select.addEventListener('change', function() {
        const selected_value = time_signature_select.value;
        console.log('selected time signature: ', selected_value);
        metronome_stop(metronome);
        metronome.time_signature = metronome.time_signatures[selected_value];
    });

    metronome_start_button.addEventListener('click', function() {
        metronome_start(metronome);
    });

    metronome_stop_button.addEventListener('click', function() {
        metronome_stop(metronome);
    });

    metronome_subdivided_button.addEventListener('click', function() {
        metronome_stop(metronome);
        if (metronome.subdivided) {
            metronome.subdivided = false;
        } else {
            metronome.subdivided = true;
        }
    });

    //metronome_start(metronome, time_signatures['Three_Four'], 60);
}

window.onload = main
