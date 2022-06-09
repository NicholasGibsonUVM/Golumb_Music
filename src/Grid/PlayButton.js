const synth = new Tone.Synth().toDestination();
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
    };
  }

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

  clicked = () => {
    this.setState({ playing: true }, () => {
      this.playSynth();
    });
  };

  render() {
    return (
      <div>
        <button
          id="playButton"
          onClick={this.clicked}
          disabled={this.state.playing}
        >
          Play Song
        </button>
      </div>
    );
  }
}
