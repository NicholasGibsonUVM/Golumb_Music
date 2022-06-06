class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.gamegrid.map((row, i1) => {
          return (
            <div key={i1}>
              {row.map((el, i2) => (
                <Square key={i2} row={i1} col={i2} clickable={el.clickable} color = {el.bgColor} changeColor={this.props.changeColor}/>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
