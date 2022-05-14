/**
 * @description 灰度化处理就是将一幅彩色图像转化为灰度图像的过程。彩色图像分为R，G，B三个分量，分别显示出红绿蓝等各种颜色，灰度化就是使彩色图像的R，G，B分量相等的过程。灰度值大的像素点比较亮（像素颜色值最大为255，为白色），反之比较暗（像素颜色值最小为0，为黑色）。
 * @link https://zhuanlan.zhihu.com/p/148503720
 * @link http://www.songho.ca/dsp/luminance/luminance.html
 */

export type RGB = [number, number, number];

/**
 * 1. 分量法
 */
export const grayScaleByColorChannel = (rgb: RGB, channel = 0): RGB => {
    return [rgb[channel], rgb[channel], rgb[channel]];
};

/**
 * 2. 最大值法
 */
export const grayScaleByMaxColorValue = (rgb: RGB): RGB => {
    const maxColor = rgb.reduce((max, value) => {
        return Math.max(max, value);
    }, 0);

    return [maxColor, maxColor, maxColor];
};

/**
 * 3. 平均值法
 */
 export const grayScaleByBalance = (rgb: RGB): RGB => {
    const balance = Math.floor(rgb.reduce((max, value) => {
        return max + value;
    }, 0) / 3);

    return [balance, balance, balance];
};

/**
 * 4. 加权平均法
 */
 export const grayScaleByBalanceWeight = (rgb: RGB): RGB => {
    const balanceWeight = Math.floor(0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]);

    return [balanceWeight, balanceWeight, balanceWeight];
};