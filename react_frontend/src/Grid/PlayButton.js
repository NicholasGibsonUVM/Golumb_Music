import React, { Component } from "react";
import * as Tone from "tone";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

class PlayButton extends Component {
  numberToNote = (num) => {
    let note = notes[num % 12];
    let octave = Math.floor(num / 12) - 2;
    return note.concat(octave);
  };

  playSynth = () => {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    const noteShift = 72 - Math.floor(this.props.range / 2);
    let noteIndex = 0;
    for (let i = 0; i < this.props.length; i++) {
      if (noteIndex >= this.props.activeNotes.length) {
        break;
      }
      console.log(
        "this.props.activeNotes[noteIndex].x",
        this.props.activeNotes[noteIndex].x
      );
      if (this.props.activeNotes[noteIndex].x === i) {
        synth.triggerAttackRelease(
          this.numberToNote(this.props.activeNotes[noteIndex].y + noteShift),
          "8n",
          now + i
        );
        noteIndex++;
      }
    }
  };

  render() {
    return (
      <div>
        <button id="playButton" onClick={this.playSynth}>
          Play Song
        </button>
      </div>
    );
  }
}

export default PlayButton;
