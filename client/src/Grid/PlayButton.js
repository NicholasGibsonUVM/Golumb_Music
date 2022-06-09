import React, { Component } from "react";
import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

class PlayButton extends Component {
  numberToNote = (num) => {
    let note = notes[num % 12];
    let octave = Math.floor(num / 12) - 2;
    return note.concat(octave);
  };

  playSynth = () => {
    const now = Tone.now();
    const noteShift = 72 - Math.floor(this.props.range / 2);
    for (let i = 0; i < this.props.activeNotes.length; i++) {
      console.log(this.numberToNote(this.props.activeNotes[i].y + noteShift));
      synth.triggerAttackRelease(
        this.numberToNote(this.props.activeNotes[i].y + noteShift),
        "8n",
        now + i
      );
    }
  };

  render() {
    return (
      <div>
        <button
          id="playButton"
          onClick={this.playSynth}
        >
          Play Song
        </button>
      </div>
    );
  }
}

export default PlayButton;
