import React from 'react'
import { Radio } from 'antd';

class Group extends React.Component {
    constructor() {
        super();
        this.state = { count: 0 }
    }

    return_three_1(base, value) {
        this.setState({ bgColor_green: '#5cb85c', bgColor_yellow: '#fff', bgColor_red: '#fff', color1: 'white', color2: 'black', color3: 'black' })
        this.props.getAnswer(base + ' ' + value)
    }

    return_three_2(base, value) {
        this.setState({ bgColor_yellow: '#ec971f', bgColor_red: '#fff', bgColor_green: '#fff', color2: 'white', color1: 'black', color3: 'black' })
        this.props.getAnswer(base + ' ' + value)
    }

    return_three_3(base, value) {
        this.setState({ bgColor_red: '#c9302c', bgColor_green: '#fff', bgColor_yellow: '#fff', color3: 'white', color2: 'black', color1: 'black' })
        this.props.getAnswer(base + ' ' + value)
    }

    render() {

        const { getAnswer, base } = this.props;
        return (
            <div style={{ display: 'grid', padding: '0 12px', textAlign: 'center' }} >
                {this.props.name}
                {this.props.values.length === 2 ?
                    < Radio.Group value={base} onChange={(e) => getAnswer(base + ' ' + e.target.value)} style={{ padding: '12px 0' }}>
                        <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_green, color: this.state.color1 }} onClick={() => this.return_three_1(this.props.base, this.props.values[0])} value={this.props.values[0]}>{this.props.metrics[0]}</Radio.Button>
                        <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_yellow, color: this.state.color2 }} onClick={() => this.return_three_2(this.props.base, this.props.values[1])} value={this.props.values[1]}>{this.props.metrics[1]}</Radio.Button>
                    </Radio.Group > : this.props.values.length === 3 ?
                        < Radio.Group value={base} onChange={(e) => getAnswer(base + ' ' + e.target.value)} style={{ padding: '12px 0' }}>
                            <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_green, color: this.state.color1 }} onClick={() => this.return_three_1(this.props.base, this.props.values[0])} value={this.props.values[0]}>{this.props.metrics[0]}</Radio.Button>
                            <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_yellow, color: this.state.color2 }} onClick={() => this.return_three_2(this.props.base, this.props.values[1])} value={this.props.values[1]}>{this.props.metrics[1]}</Radio.Button>
                            <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_red, color: this.state.color3 }} onClick={() => this.return_three_3(this.props.base, this.props.values[2])} value={this.props.values[2]}>{this.props.metrics[2]}</Radio.Button>
                        </Radio.Group > :
                        this.props.values.length === 4 ?
                            < Radio.Group value={this.props.base} onChange={(e) => getAnswer(base + ' ' + e.target.value)} style={{ padding: '12px 0' }}>
                                <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_red, color: this.state.color1 }} onClick={() => this.setState({ bgColor_red: '#c9302c', bgColor_yellow: '#fff', bgColor_pink: '#fff', bgColor_green: '#fff', color1: 'white', color2: 'black', color3: 'black', color4: 'black' })} value={this.props.values[0]}>{this.props.metrics[0]}</Radio.Button>
                                <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_green, color: this.state.color2 }} onClick={() => this.setState({ bgColor_green: '#5cb85c', bgColor_red: '#fff', bgColor_pink: '#fff', bgColor_yellow: '#fff', color2: 'white', color1: 'black', color3: 'black', color4: 'black' })} value={this.props.values[1]}>{this.props.metrics[1]}</Radio.Button>
                                <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_yellow, color: this.state.color3 }} onClick={() => this.setState({ bgColor_yellow: '#ec971f', bgColor_green: '#fff', bgColor_pink: '#fff', bgColor_red: '#fff', color3: 'white', color2: 'black', color1: 'black', color4: 'black' })} value={this.props.values[2]}>{this.props.metrics[2]}</Radio.Button>
                                <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_pink, color: this.state.color4 }} onClick={() => this.setState({ bgColor_pink: 'rgb(236, 129, 184)', bgColor_green: '#fff', bgColor_yellow: '#fff', color4: 'white', color3: 'black', color1: 'black', color2: 'black' })} value={this.props.values[3]}>{this.props.metrics[3]}</Radio.Button>
                            </Radio.Group > :
                            this.props.values.length === 5 ?
                                < Radio.Group value={this.props.base} onChange={(e) => getAnswer(base + ' ' + e.target.value)} style={{ padding: '12px 0' }}>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_red, color: this.state.color1 }} onClick={() => this.setState({ bgColor_red: '#c9302c', bgColor_blue: '#fff', bgColor_yellow: '#fff', bgColor_green: '#fff', bgColor_pink: '#fff', color1: 'white', color2: 'black', color3: 'black', color4: 'black', color5: 'black' })} value={this.props.values[0]}>{this.props.metrics[0]}</Radio.Button>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_green, color: this.state.color2 }} onClick={() => this.setState({ bgColor_green: '#5cb85c', bgColor_blue: '#fff', bgColor_red: '#fff', bgColor_yellow: '#fff', bgColor_pink: '#fff', color2: 'white', color1: 'black', color3: 'black', color5: 'black', color4: 'black' })} value={this.props.values[1]}>{this.props.metrics[1]}</Radio.Button>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_yellow, color: this.state.color3 }} onClick={() => this.setState({ bgColor_yellow: '#ec971f', bgColor_blue: '#fff', bgColor_green: '#fff', bgColor_pink: '#fff', bgColor_red: '#fff', color3: 'white', color1: 'black', color2: 'black', color5: 'black', color4: 'black' })} value={this.props.values[2]}>{this.props.metrics[2]}</Radio.Button>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_pink, color: this.state.color4 }} onClick={() => this.setState({ bgColor_pink: 'rgb(236, 129, 184)', bgColor_blue: '#fff', bgColor_red: '#fff', bgColor_yellow: '#fff', bgColor_green: '#fff', color4: 'white', color1: 'black', color2: 'black', color3: 'black', color5: 'black' })} value={this.props.values[3]}>{this.props.metrics[3]}</Radio.Button>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_blue, color: this.state.color5 }} onClick={() => this.setState({ bgColor_blue: '#40a9ff', bgColor_green: '#fff', bgColor_yellow: '#fff', bgColor_pink: '#fff', bgColor_red: '#fff', color5: 'white', color2: 'black', color1: 'black', color3: 'black', color4: 'black' })} value={this.props.values[4]}>{this.props.metrics[4]}</Radio.Button>
                                </Radio.Group > :
                                this.props.values.length === 6 &&
                                < Radio.Group value={this.props.base} onChange={(e) => getAnswer(base + ' ' + e.target.value)} style={{ padding: '12px 0' }}>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_red, color: this.state.color1 }} onClick={() => this.setState({ bgColor_red: '#c9302c', bgColor_blue: '#fff', bgColor_yellow: '#fff', bgColor_green: '#fff', bgColor_pink: '#fff', color1: 'white', color2: 'black', color3: 'black', color4: 'black', color5: 'black', bgColor_or: '#fff', color6: 'black' })} value={this.props.values[0]}>{this.props.metrics[0]}</Radio.Button>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_green, color: this.state.color2 }} onClick={() => this.setState({ bgColor_green: '#5cb85c', bgColor_blue: '#fff', bgColor_red: '#fff', bgColor_yellow: '#fff', bgColor_pink: '#fff', color2: 'white', color1: 'black', color3: 'black', color5: 'black', color4: 'black', bgColor_or: '#fff', color6: 'black' })} value={this.props.values[1]}>{this.props.metrics[1]}</Radio.Button>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_yellow, color: this.state.color3 }} onClick={() => this.setState({ bgColor_yellow: '#ec971f', bgColor_blue: '#fff', bgColor_green: '#fff', bgColor_pink: '#fff', bgColor_red: '#fff', color3: 'white', color1: 'black', color2: 'black', color5: 'black', color4: 'black', bgColor_or: '#fff', color6: 'black' })} value={this.props.values[2]}>{this.props.metrics[2]}</Radio.Button>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_pink, color: this.state.color4 }} onClick={() => this.setState({ bgColor_pink: 'rgb(236, 129, 184)', bgColor_blue: '#fff', bgColor_red: '#fff', bgColor_yellow: '#fff', bgColor_green: '#fff', color4: 'white', color1: 'black', color2: 'black', color3: 'black', color5: 'black', bgColor_or: '#fff', color6: 'black' })} value={this.props.values[3]}>{this.props.metrics[3]}</Radio.Button>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_blue, color: this.state.color5 }} onClick={() => this.setState({ bgColor_blue: '#40a9ff', bgColor_green: '#fff', bgColor_yellow: '#fff', bgColor_pink: '#fff', bgColor_red: '#fff', color5: 'white', color2: 'black', color1: 'black', color3: 'black', color4: 'black', bgColor_or: '#fff', color6: 'black' })} value={this.props.values[4]}>{this.props.metrics[4]}</Radio.Button>
                                    <Radio.Button style={{ width: '180px', backgroundColor: this.state.bgColor_or, color: this.state.color6 }} onClick={() => this.setState({ bgColor_or: '#f0dc4e', bgColor_green: '#fff', bgColor_yellow: '#fff', bgColor_pink: '#fff', bgColor_red: '#fff', color2: 'black', color1: 'black', color3: 'black', color4: 'black', bgColor_blue: '#fff', color5: 'black' })} value={this.props.values[5]}>{this.props.metrics[5]}</Radio.Button>
                                </Radio.Group >
                }
            </div >
        )
    }

}

export default Group;