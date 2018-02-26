import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  MainContainer,
  ContentContainer,
  TwittsContainer,
  SidebarContainer,
  SidebarContent,
  TimeSpanInput,
  Seconds,
} from './StyledComponents';

import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete';

import { Card, CardHeader, CardText } from 'material-ui/Card';

class Pattern6 extends Component {
  render() {
    return (
        <MainContainer>
          <SidebarContainer>
              <SidebarContent>
                <TimeSpanInput>
                  <Seconds>{this.props.timeSpan}</Seconds>
                  <Slider style={{ height: 100 }} max={60} min={0} onChange={this.props.onChangeTimeSpan} axis="y"
                          defaultValue={10}/>
                </TimeSpanInput>
                <Menu disableAutoFocus={true}>
                  {
                    Object.keys(this.props.cycles).map((cycleKey) => {
                        const text = this.props.cycles[cycleKey].searchQuery;
                        return (
                          <div style={{ display: 'flex' }} key={cycleKey}>
                            <MenuItem onClick={() => this.props.displayCycle(cycleKey)}
                                      primaryText={text.length === 0 ? 'EMPTY' : text}/>
                            {cycleKey !== this.props.displaying ?
                              <Delete onClick={() => this.props.removeCycle(cycleKey)}/> : null}
                          </div>
                        );
                      })
                  }
                </Menu>
                <ContentAdd onClick={this.props.addCycle}/>
              </SidebarContent>
          </SidebarContainer>
          <ContentContainer>
              <TextField
                value={this.props.searchQuery}
                hintText="Search something"
                onChange={this.props.onChangeSearchQuery}
              />
            <TwittsContainer>
              {this.props.errors.length !== 0 &&
              <Card style={{ margin: '0.5rem', backgroundColor: '#F44336'}}>
                <CardHeader
                  title={'ERROR'}
                />
                <CardText>
                  {'Error fetching tweets. This pattern consumes the twitter API through a little express service. You need to set up the service configuration and npm run server:pattern6.'}
                </CardText>
              </Card>
              }
              {Object.values(this.props.tweets).map((t, k) => (
                <Card style={{ margin: '0.5rem' }} onClick={() => { this.props.router.push(`/twit/${t.id}`); }} key={k}>
                  <CardHeader
                    title={t.user.name}
                    avatar={t.user.userImage}
                  />
                  <CardText>
                    {t.text}
                  </CardText>
                </Card>
              ))}
            </TwittsContainer>
          </ContentContainer>
        </MainContainer>
    );
  }
}

Pattern6.propTypes = {
  cycles: PropTypes.object,
  errors: PropTypes.array,
  searchQuery: PropTypes.string,
  timeSpan: PropTypes.number,
  tweets: PropTypes.object,
  displaying: PropTypes.string,
  router: PropTypes.object,
  onChangeTimeSpan: PropTypes.func,
  onChangeSearchQuery: PropTypes.func,
  addCycle: PropTypes.func,
  displayCycle: PropTypes.func,
  removeCycle: PropTypes.func,
};


export default Pattern6;
