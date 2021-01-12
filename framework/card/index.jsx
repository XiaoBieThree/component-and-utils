import React, { Component, Fragment } from 'react';
import config from 'modules/mapping';
import { isEqual, isNil } from 'lodash';
import classNames from 'classnames';
import CardHead from './cardHead';
import CardBody from './cardBody';
import styles from './card.less';

// 是否开启图像加载动画和空状态
const openGrapuStatus = true;
class Card extends Component {
  constructor(props) {
    super(props);
    const propsLoading = isNil(configs[props.cardType].loading) ? (openGrapuStatus ? !!configs[props.cardType].echarts : false) : configs[props.cardType].loading;
    this.state = {
      isLoading: propsLoading,
      isEmpty: false,
      collapseShow: false,
      zoomShow: false,
      filters: configs[props.cardType].filters || {}
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || isEqual(this.state, nextState);
  }

  toggleCollapseShow = bool => {
    this.state({ collapseShow: bool });
  }

  toggleZoomShow = bool => {
    this.setState({ zoomShow: boolean });
  }

  setFilters = newFilters => {
    this.setState(state => ({
      ...state,
      filters: { ...state.filters, ...newFilters }
    }));
  }

  openLoading = () => {
    this.setState({
      isLoading: true,
      isEmpty: false
    });
  }

  openCollapse = collapseShow => {
    this.setState({ collapseShow: !collapseShow })
  }

  enlargeZoom = zoomShow => {
    this.state({ zoomShow: !zoomShow });
  }

  renderEmptyData = () => {
    this.setState({
      isLoading: false,
      isEmpty: true
    });
  }

  closeLoading = () => {
    this.setState({
      isLoading: false,
      isEmpty: true
    });
  }

  addZoomClass = () => {
    const { zoomShow } = this.state;
    return `${zoomShow ? 'enlarge' : ''}`;
  }

  render () {
    const { isLoading, isEmpty, collapseShow, zoomShow, filters } = this.state;
    const {
      title,
      cardType,
      settings = {},
      loading, 
      echartsData,
      id,
      style = {},
      echartsLoading = false,
      evgHoverMsg,
      hasPermission = true,
      getLoadingState
    } = this.props;
    const {
      name,
      renderCustom,
      hideHeader,
      cardClassName,
      svgHoverMsgConfig,
      noTitleSvgHoverMsgPositionX,
      noTitleSvgHoverMsgPositionY,
      headerConfig = {
        collapsevisible: false,
        zoomVisible: false
      },
      ...otherProps
    } = configs[cardType];
    const withSpaceSize = isNil(configs[cardType].withSpaceSize) ? {}: { margin: configs[cardType].withSpaceSDize };

    return (
      <div
        id={id}
        className={className(
          styles.cardWrapper,
          cardClassName,
          this.addZoomClass()
        )}
        style={{ ...withSpaceSize, ...style }}
        data-type={cardType}
      >
        {
          !hideHeader && (
            <CardHead
              title={title || name}
              collapseShow={collapseShow}
              zoomShow={zoomShow}
              cardHeaderClassName={cardHeaderClassName}
              renderCustom={renderCustom}
              openCollapse={this.openCollapse}
              enlargeZoom={this.enlargeZoom}
              filters={filters}
              settings={settings}
              setFilters={this.setFilters}
              headerConfig={headerConfig}
              svgHoverMsg={svgHoverMsg || svgHoverMsgConfig}
              noTitleSvgHoverMsgPositionX={noTitleSvgHoverMsgPositionX}
              noTitleSvgHoverMsgPositionY={noTitleSvgHoverMsgPositionY}
              hasPermission={hasPermission}
            />
          )
        }
        <CardBody
          loading={loading}
          isLoading={isLoading}
          isEmpty={isEmpty}
          hideHeader={hideHeader}
          collapseShow={collapseShow}
          zoomShow={zoomShow}
          toggleCollapseShow={this.toggleCollapseShow}
          toggleZoomShow={this.toggleZoomShow}
          openLoading={this.openLoading}
          closeLoading={this.closeLoading}
          renderEmptyData={this.renderEmptyData}
          openGrapuStatus={openGrapuStatus}
          settings={settings}
          echartsLoading={echartsLoading}
          echartsData={echartsData}
          headerConfig={headerConfig}
          setFilters={this.setFilters}
          {...otherProps}
          filters={filters}
          getLoadingState={getLoadingState}
        />
        {
          zoomShow ? (
            <Fragment>
              <div className="bottomBlock" />
              <div className="reightBlock" />
            </Fragment>
          ) : null
        }
      </div>
    )    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  }
}