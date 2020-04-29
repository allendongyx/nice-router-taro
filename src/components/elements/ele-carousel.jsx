import Taro from '@tarojs/taro'
import { Swiper, SwiperItem, Video, View } from '@tarojs/components'

import NavigationService from '@/nice-router/navigation.service'
import ServerImage from '@/server-image/server-image'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import classNames from 'classnames'
import ActionUtil from '@/nice-router/action-util'

import './styles.scss'

function EleCarousel(props) {
  const {
    items,
    autoplay,
    interval,
    duration,
    circular,
    indicatorColor,
    indicatorActiveColor,
    indicatorDots,
    customStyle,
    className,
    mode,
  } = props

  const handleClick = (item = {}) => {
    const { videoUrl = '', imageUrl } = item
    console.log('carousel viewed', item)

    if (isNotEmpty(videoUrl)) {
      return
    }

    if (ActionUtil.isActionLike(item)) {
      NavigationService.view(item)
      return
    }

    if (isEmpty(videoUrl) && isNotEmpty(imageUrl)) {
      Taro.previewImage({ urls: [imageUrl] })
    }
  }

  const showDots = indicatorDots === null ? items.length > 1 : indicatorDots

  const rootClass = classNames('ele-carousel', className)
  return isEmpty(items) ? null : (
    <View className={rootClass} style={customStyle}>
      <Swiper
        autoplay={autoplay}
        interval={interval}
        duration={duration}
        circular={circular}
        indicatorColor={indicatorColor}
        indicatorActiveColor={indicatorActiveColor}
        indicatorDots={showDots}
        className='ele-carousel-item'
      >
        {items.map((it) => {
          const { videoUrl = '', imageUrl, id } = it
          return (
            <SwiperItem key={id} onClick={handleClick.bind(this, it)} className='ele-carousel-item'>
              {videoUrl.length > 0 ? (
                <Video
                  className='ele-carousel-item'
                  src={videoUrl}
                  controls
                  autoplay={it.autoplay}
                  poster={imageUrl}
                  initialTime='0'
                  loop
                  muted={false}
                />
              ) : (
                <ServerImage className='ele-carousel-item' src={it.imageUrl} mode={mode} size='large' />
              )}
            </SwiperItem>
          )
        })}
      </Swiper>
    </View>
  )
}

EleCarousel.options = {
  addGlobalClass: true,
}

EleCarousel.defaultProps = {
  items: [],
  autoplay: false,
  interval: 5000,
  duration: 1000,
  circular: true,
  indicatorColor: 'rgba(255, 255, 255, 0.6)',
  indicatorActiveColor: '#fff',
  indicatorDots: null,
  customStyle: {},
  className: null,
  mode: 'aspectFill',
}

export default EleCarousel