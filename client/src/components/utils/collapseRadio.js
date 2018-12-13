import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class CollapseRadio extends Component {

    state = {
        open: false,
        value: '0'
    }

    componentDidMount () {
        if (this.props.initState){
            this.setState({
                open: this.props.initState
            })
        }
    }

    handleClick =()=> {
        this.setState({open: !this.state.open})
    }

    handleArrow =()=> (
        this.state.open ? 
            <FontAwesomeIcon 
                icon={faAngleUp}
                className='icon'
            />
        :
            <FontAwesomeIcon 
            icon={faAngleDown}
            className='icon'
            />
    )

    renderList = () => (
        this.props.list ?
            this.props.list.map(item => (
                <FormControlLabel 
                    key={item._id}
                    value={`${item._id}`}
                    control={<Radio />}
                    label={item.name}
                />
            ))
        : null
    )

    handleChange = (event) => {
        let tempArray = []
        const data = this.props.list
        for (let key in data) {
            if (data[key]._id === parseInt(event.target.value, 10)){
                tempArray = data[key].array
            }
        }

        this.setState({
            value: event.target.value
        }, () => {
            this.props.handleFilters(tempArray)
        })
    }

    render() {
        return (
            <div>
                <List style={{borderBottom: '1px solid #DBDBDB'}}>
                    <ListItem onClick={this.handleClick} style={{padding: '10px 23px 10px 0'}}>
                        <ListItemText 
                            primary={this.props.title}
                            className='collapse_title'
                        />
                        {this.handleArrow()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                            <RadioGroup
                                aria-label='prices'
                                name='prices'
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                {this.renderList()}
                            </RadioGroup>
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

export default CollapseRadio;