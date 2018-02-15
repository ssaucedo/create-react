import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  MainContainer,
  ContentContainer,
  SidebarContainer,
  SidebarContent,
  TimeSpanInput,
  Seconds,
} from './StyledComponents'

import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import TextField from 'material-ui/TextField'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Delete from 'material-ui/svg-icons/action/delete'

import { Card, CardHeader, CardText } from 'material-ui/Card'

class Pattern6 extends Component {


  render () {
    const style = {
      paper: {
        height: '100%',
        display: 'inline-block',
        float: 'left',
        width: '100%',
        padding: '20px',
        overflow: 'auto'
      },
    }

    return (
        <MainContainer>
          <SidebarContainer>
            <Paper style={{
              ...style.paper,
              width: '90%'
            }}>
              <SidebarContent>
                <TimeSpanInput>
                  <Seconds>{this.props.timeSpan}</Seconds>
                  <Slider style={{height: 100}} max={60} min={0} onChange={this.props.onChangeTimeSpan} axis="y"
                          defaultValue={10}/>
                </TimeSpanInput>
                <Menu disableAutoFocus={true}>
                  {
                    Object.keys(this.props.cycles).map((cycleKey) => {
                        const text = this.props.cycles[cycleKey].searchQuery
                        return (
                          <div style={{display: 'flex'}} key={cycleKey}>
                            <MenuItem onClick={() => this.props.displayCycle(cycleKey)}
                                      primaryText={text.length === 0 ? 'EMPTY' : text}/>
                            {cycleKey !== this.props.displaying ?
                              <Delete onClick={() => this.props.removeCycle(cycleKey)}/> : null}
                          </div>
                        )
                      }
                    )
                  }
                </Menu>
                <ContentAdd onClick={this.props.addCycle}/>
              </SidebarContent>
            </Paper>
          </SidebarContainer>
          <ContentContainer>
            <Paper style={{
              ...style.paper,
            }}>
              <TextField
                value={this.props.searchQuery}
                hintText="Search something"
                onChange={this.props.onChangeSearchQuery}
              />
              {Object.values(this.props.tweets).map((t, k) => (
                <Card onClick={() => {this.props.router.push(`/twit/${t.id}`)}} key={k}>
                  <CardHeader
                    title={t.user.name}
                    avatar={t.user.userImage}
                  />
                  <CardText>
                    {t.text}
                  </CardText>
                </Card>
              ))}
            </Paper>
          </ContentContainer>
        </MainContainer>
    )
  }
}

Pattern6.propTypes = {
  onChangeTimeSpan: PropTypes.func,
  onChangeSearchQuery: PropTypes.func,
  addCycle: PropTypes.func,
  displayCycle: PropTypes.func,
  removeCycle: PropTypes.func,
}


export default Pattern6