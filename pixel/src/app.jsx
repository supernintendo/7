module.exports = (function() {
    var React = require('react'),
        randomColor = require('randomcolor'),
        colorPalette = function(count, luminosity) {
            return Array.apply(null, Array(count)).map(function() {
                return randomColor({
                    luminosity: luminosity
                });
            });
        },
        colors = (['black', 'white', '#ECF1F2']
            .concat(colorPalette(29, 'bright'))
            .concat(colorPalette(29, 'light'))
            .concat(colorPalette(29, 'dark'))
        ),
        activeColor = colors[0],
        mouseDown = false,
        width = 16,
        height = 16,

        // An individual cell on the pixel editor.
        Cell = React.createClass({
            getInitialState: function() {
                return {
                    color: '#FFFFFF'
                };
            },
            handleClick: function() {
                this.setState({
                    color: activeColor
                });
            },
            handleHover: function(e) {
                if (mouseDown) {
                    this.setState({
                        color: activeColor
                    });
                }
                e.preventDefault();
            },
            render: function() {
                var styles = {
                    backgroundColor: this.state.color
                };

                return (
                    <div className='pixel-cell'
                         onMouseDown={this.handleClick}
                         onMouseEnter={this.handleHover}
                         onTouchMove={this.handleHover}
                         style={styles}></div>
                );
            }
        }),

        // An individual cell within the color palette.
        ColorCell = React.createClass({
            setActiveColor: function() {
                activeColor = this.props.color;
            },
            render: function() {
                var styles = {
                    backgroundColor: this.props.color
                };

                return (
                    <div className="color-cell"
                         onClick={this.setActiveColor}
                         style={styles}>
                    </div>
                );
            }
        }),

        // Top level class.
        Editor = React.createClass({
            componentDidUpdate: function() {
                if (this.state.tripping) {
                    document.body.classList.add('tripping');
                } else {
                    document.body.classList.remove('tripping');
                }
            },
            getInitialState: function() {
                return {
                    tripping: false
                };
            },
            toggleTrip: function() {
                this.setState({
                    tripping: !this.state.tripping
                });
            },
            render: function() {
                var i,
                    buttonLabel = this.state.tripping ? "Return to normal" : "Trip";
                    nodes = [];

                for (i = 0; i < this.props.colors.length; i++) {
                    nodes.push(<ColorCell color={this.props.colors[i]} key={"color-cell-" + i} />);
                }
                return (
                    <div>
                        <Table height={this.props.height} width={this.props.width} />
                        <div className="palette">
                            {nodes}
                        </div>
                        <div>
                            <button onClick={this.toggleTrip}>{buttonLabel}</button>
                        </div>
                    </div>
                );
            }
        }),

        // A row on the pixel editor.
        Row = React.createClass({
            render: function() {
                var i, nodes = [];

                for (i = 0; i < this.props.width; i++) {
                    nodes.push(<Cell key={"cell-" + i} />);
                }
                return (
                    <div className="pixel-row">
                        {nodes}
                    </div>
                );
            }
        }),

        // The pixel editor itself.
        Table = React.createClass({
            handleMouseDown: function(e) {
                mouseDown = true;
            },
            handleMouseUp: function(e) {
                mouseDown = false;
            },
            render: function() {
                var i, nodes = [];

                for (i = 0; i < this.props.height; i++) {
                    nodes.push(<Row key={"row-" + i} width={this.props.width} />);
                }
                return (
                    <div className="pixel-table"
                         onMouseDown={this.handleMouseDown}
                         onMouseUp={this.handleMouseUp}
                         onTouchStart={this.handleMouseDown}
                         onTouchEnd={this.handleMouseUp}>
                        {nodes}
                    </div>
                );
            }
        });

    React.initializeTouchEvents(true);
    React.render(
        <Editor colors={colors} height={height} width={width} />,
        document.getElementById('content')
    );
})();
