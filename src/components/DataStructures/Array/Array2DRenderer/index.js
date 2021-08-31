/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-mixed-operators */
/* eslint-disable arrow-parens */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import React from 'react';
// import Array1DRenderer from '../Array1DRenderer/index';
import Renderer from '../../common/Renderer/index';
import styles from './Array2DRenderer.module.scss';
import { classes } from '../../common/util';
import { mode } from '../../../top/Settings';
import { motion } from 'framer-motion'

let modename;
function switchmode(modetype = mode()) {
  switch (modetype) {
    case 1:
      modename = styles.array_2d_green;
      break;
    case 2:
      modename = styles.array_2d_blue;
      break;
    default:
      modename = styles.array_2d;
  }
  return modename;
}


class Array2DRenderer extends Renderer {
  constructor(props) {
    super(props);

    this.togglePan(true);
    this.toggleZoom(true);
  }


  renderData() {
    
    // MF added
    // const { algo } = this.props.data;
    // const data = this.state.data;
    const { data, algo } = this.props.data;
    console.log(data);

    const isArray1D = true;
    // const isArray1D = this instanceof Array1DRenderer;
    let longestRow = data.reduce((longestRow, row) => longestRow.length < row.length ? row : longestRow, []);


    return (
      <table className={switchmode(mode())}
             style={{ marginLeft: -this.centerX * 2, marginTop: -this.centerY * 2, transform: `scale(${this.zoom})` }}>
        <tbody>
        <tr className={styles.row}>
          {
            !isArray1D &&
            <td className={classes(styles.col, styles.index)} />
          }
          {
            longestRow.map((_, i) => {
              // if the graph instance is heapsort, then the array index starts from 1
              if (algo === 'heapsort') {
                i += 1;
              }
              return (
                <td className={classes(styles.col, styles.index)} key={i}>
                  <span className={styles.value}>{i}</span>
                </td>
              );
            })
          }
        </tr>
        {
          data.map((row, i) => (
            <tr className={styles.row} key={i}>
              {
                !isArray1D &&
                <td className={classes(styles.col, styles.index)}>
                  <span className={styles.value}>{i}</span>
                </td>
              }
              {
                row.map((col, j) => (
                  <motion.td layout 
                  whileHover={{ scale: 1.2 }}
                  className={classes(styles.col, col.selected && styles.selected, col.patched && styles.patched, col.sorted && styles.sorted, col.variables && styles[col.variables.colour])}
                      key={col.key}>
                    <span className={styles.value}>{this.toString(col.value)}</span>
                  </motion.td>
                ))
              }
            </tr>
          ))
        }
        {
          data.map((row, i) => (
            <tr className={styles.row} key={i}>
              { isArray1D && 
                row.map((col, j) => (
                  <motion.td layout className={classes(styles.col, styles.variable, col.variables && styles[col.variables.colour])}
                      key={col.key}>
                    <span className={styles.value}>{col.variables.value}</span>
                  </motion.td>
                ))
              }
            </tr>
          ))
        }
        </tbody>
      </table>
    );
  }
}

export default Array2DRenderer;

