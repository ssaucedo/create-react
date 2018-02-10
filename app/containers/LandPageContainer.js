import PropTypes from 'prop-types'
import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import {
	MainContainer,
	ContentContainer,
	SidebarContainer,
} from './StyledComponents'

import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew'
import ActionReorder from 'material-ui/svg-icons/action/reorder'
import ActionTimeline from 'material-ui/svg-icons/action/timeline'
import PatternResolver from './PatternResolver'

class LandPageContainer extends Component {
	constructor(props) {
		super(props)
	}


	render() {
		const style = {
			paper: {
				height: '100%',
				display: 'inline-block',
				float: 'left',
			},
		}

		// const pattern2 = <MenuItem onClick={updatePattern('PATTERN_2')} primaryText="Pattern 2" rightIcon={<ActionReorder />}/>


		const { dispatch } = this.props
		const updatePattern = pattern => () => dispatch({ type: 'CHANGE_PATTERN', payload: { pattern } })
		return (
  <MuiThemeProvider>
  <MainContainer>
  <SidebarContainer>
      <Paper style={style.paper}>
      <Menu>
  <MenuItem
									onClick={updatePattern('PATTERN_1')} primaryText="Pattern 1"
  rightIcon={<ActionAutorenew />}
								/>

  <MenuItem
									onClick={updatePattern('PATTERN_3')} primaryText="Pattern 3"
  rightIcon={<ActionTimeline />}
								/>
							</Menu>
						</Paper>
    </SidebarContainer>
  <ContentContainer>
  <Paper style={{
							...style.paper,
							width: '100%',
						}}
						>
  <PatternResolver />
						</Paper>
					</ContentContainer>
				</MainContainer>
			</MuiThemeProvider>

		)
	}
}


const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(null, mapDispatchToProps)(LandPageContainer)
