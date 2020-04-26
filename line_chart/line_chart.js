const dataset = {
  'label': ['nft0db9tau','40dbtlu77d','8fnfl9il3y','reg12v6vrm','fa0d98wo4u','bzildiwajl','y28q950bzg','geoo503s2l','zx99wiofpe','4biz733von','w2iokw0pu6','4uijq1qtiz','dttrqa4nmn','m3uso56ysh','6976a9xodo'],
  'f71s81dhj5': ['10','7','13','16','7','7','7','19','12','4','3','7','19','8','17'],
  'zidgibxa6d': ['14','3','dfdf','10','3','6','5','18','13','4','11','3','13','9','12'],
  'bw0eck4nmb': ['12','4','cbc','11','15','10','14','16','17','3','12','6','4','8','15'],
  'qzbag4icbq': ['10','16','$fjd','18','7','9','11','13','12','19','15','11','10','12','11'],
  'vrcw3nu8rr': ['15','11','16','8','19','7','7','19','9','12','19','7','5','4','16'],
  'dq1wa43m7b': ['3','16','4','14','8','12','13','12','5','14','8','10','7','11','11']
  // '1kjluacxrk': ['8','10','11','6','3','15','7','8','18','10','18','18','9','13','11'],
  // 'qjr0b62cjc': ['12','18','12','11','7','11','12','','16','15','11','18','12','5','8'],
  // 'vuv7qbcwvw': ['7','16','14','11','7','17','11','11','5','15','5','3','5','8','12'],
  // 'k0m1081kkb': ['6','19','6','18','12','5','12','17','12','14','15','19','10','3','6'],
  // 'b0to441qow': ['11','9','16','10','19','6','10','11','18','','9','3','12','10','4'],
  // 'q5tr9siw03': ['7','10','4','10','3','15','15','19','8','14','','7','9','3','8'],
  // 'uax7jtwpmi': ['18','15','9','12','4','16','16','19','12','14','10','17','5','6','6'],
  // '34mufuk6k5': ['8','19','13','17','8','12','12','18','17','12','15','19','14','9','6'],
  // 'yh2htao507': ['15','19','9','8','16','15','11','4','12','5','11','3','17','4','6'],
  // 'i0gwt4ih07': ['19','3','3','12','4','17','5','7','3','9','15','8','18','3','12'],
  // 'o1o070i0ey': ['16','12','5','18','14','19','5','15','3','3','19','6','12','18','17'],
  // 'gh0ozay8mg': ['9','18','13','18','9','14','17','12','12','6','8','14','18','7','13'],
  // 'z3nb5ez66j': ['14','15','8','15','13','3','8','4','11','18','15','13','16','8','10'],
  // '2pymm5y8cm': ['17','13','15','4','7','7','12','6','17','12','12','8','10','17','4'],
  // 'oxulwixo1u': ['6','6','17','12','18','8','8','11','18','17','6','10','10','9','10'],
  // 'ktkjz9oc74': ['16','17','14','4','11','18','19','16','19','6','8','12','7','3','5'],
  // 'awco6lqboq': ['3','19','10','16','4','30','9','14','13','7','3','13','5','12','19'],
  // 'tcml1u26wn': ['14','19','7','10','12','8','18','4','12','11','12','9','6','18','10'],
  // 'yr91oinfz3': ['6','10','10','3','12','4','19','19','19','5','8','19','18','16','18'],
  // 'qo752vzksn': ['19','9','10','4','19','8','3','12','12','7','15','11','7','18','14'],
  // 'b63kkf8xii': ['16','14','14','16','15','13','3','14','10','17','18','9','11','9','19']
};

window.onload = function init() {
  const container = document.querySelector(`section#chart`);
  const chart = new LineChart(dataset, container, 1800, 300);

  // highlighting
  // chart.hilite_by_id([`zidgibxa6d`], true );
  // chart.hilite_by_id([`zidgibxa6d`,`bw0eck4nmb`] );
  // chart.hilite_by_id([`f71s81dhj5`] );
  chart.hilite_by_id([`dq1wa43m7b`] );
  // chart.hilite_by_id();
}

class LineChart {
  constructor(data, container, width, height) {
    this.svgns = `http://www.w3.org/2000/svg`;
    this.data = data;
    this.root = null;
    this.container = container;
    this.min = null;
    this.max = null;
    this.record_count = null;
    this.record_labels = null;
    this.width = width || document.documentElement.clientWidth;
    this.height = height || 400; //document.documentElement.clientHeight;
    this.font_size = 15;
    this.x_label_font_size = 15;
    this.margin = 15;
    this.ticklength = 10;
    this.line_label_width = 80;
    this.axis_label_bbox = {
      x: this.ticklength + (this.font_size * 1.5),
      y: this.font_size
    }
    this.dataspace = {
      x: this.margin + this.axis_label_bbox.x,
      y: this.margin,
      width: this.width - (this.margin * 2) - this.axis_label_bbox.x - this.line_label_width,
      height: this.height - (this.margin * 2) - this.axis_label_bbox.y
    }

    this.init()
  }

  init () {
    this.find_min_max_values(this.data);
    this.create_chart();
    this.create_axes();

    let idnum = 0;
    for (const series in this.data) {
      if (`label` === series) {
        this.record_count = this.data[series].length;
      } else {
        let series_data = this.data[series];
        this.create_dataline(series_data, series, idnum++);
      }
    }
  }

  find_min_max_values(data) {
    // TODO: find longest string in labels, set line_label_width and x_label_font_size accordingly
    // const longest_string = this.record_labels.reduce((a, b) => { return a.length > b.length ? a : b; });

    for (const series in dataset) {
      if (`label` === series) {
        this.record_labels = dataset[series];
        this.record_count = this.record_labels.length;
      } else {
        let row = dataset[series];
        for (let record of row) {
          let val = parseFloat(record);

          if (!this.max || !this.min) {
            this.max = !this.max ? val : this.max;
            this.min = !this.min ? val : this.min;
          }

          if (`` !== val && !isNaN(val)) {
            this.max = this.max < val ? val : this.max;
            this.min = this.min > val ? val : this.min;
          }
        }
      }
    };
  }

  single_precision ( float ) {
    return Math.round(float * 10) / 10;
  }

  create_chart() {
    this.root = document.createElementNS(this.svgns, `svg`);
    this.root.setAttribute(`xmlns`, this.svgns);
    this.root.setAttribute(`viewBox`, `0 0 ${this.width} ${this.height}`);

    let bg = document.createElementNS(this.svgns, `rect`);
    bg.setAttribute(`width`, this.width);
    bg.setAttribute(`height`, this.height);
    bg.setAttribute(`fill`, `white`);
    bg.setAttribute(`stroke`, `gainsboro`);
    this.root.appendChild(bg);

    this.container.appendChild(this.root);
  }

  create_axes() {
    //  create x axis
    let x_axis = document.createElementNS(this.svgns, `g`);
    x_axis.id = `x_axis`;
    x_axis.classList.add(`axis`, `x`);

    // create line
    let x_line = document.createElementNS(this.svgns, `path`);
    x_line.setAttribute(`d`, `M${this.dataspace.x},${this.dataspace.y + this.dataspace.height} H${this.dataspace.x + this.dataspace.width}`);
    x_line.classList.add(`axis`);
    x_axis.appendChild(x_line);

    // create tickmarks
    const t_len = this.record_count;
    const x_tick_distance = this.single_precision(this.dataspace.width / (t_len - 1));
    for (let t = 0; t_len > t; ++t) {
      let tick = document.createElementNS(this.svgns, `g`);

      let tick_line = document.createElementNS(this.svgns, `path`);
      tick_line.setAttribute(`d`, `M${this.dataspace.x + (x_tick_distance * t)},${this.dataspace.y + this.dataspace.height} V${this.dataspace.y + this.dataspace.height + this.ticklength}`);
      tick_line.classList.add(`axis`);
      tick.appendChild(tick_line);

      let tick_label = document.createElementNS(this.svgns, `text`);
      tick_label.setAttribute(`x`, this.dataspace.x + (x_tick_distance * t) );
      tick_label.setAttribute(`y`, this.dataspace.y + this.dataspace.height + this.ticklength + this.font_size);
      tick_label.classList.add(`tick_label`);
      tick_label.textContent = this.record_labels[t];
      tick.appendChild(tick_label);

      x_axis.appendChild(tick);
    }
    this.root.appendChild(x_axis);

    //  create y axis
    let y_axis = document.createElementNS(this.svgns, `g`);
    y_axis.id = `y_axis`;
    y_axis.classList.add(`axis`, `y`);

    // create line
    let y_line = document.createElementNS(this.svgns, `path`);
    y_line.setAttribute(`d`, `M${this.dataspace.x},${this.dataspace.y} V${this.dataspace.y + this.dataspace.height}`);
    y_line.classList.add(`axis`);
    y_axis.appendChild(y_line);

    // create tickmarks
    const y_tick_values = [0, (this.max / 2), (this.max)];
    const y_t_len = 3;
    const y_tick_distance = this.single_precision(this.dataspace.height / (y_t_len - 1));
    for (let t = 0; y_t_len > t; ++t) {
      let tick = document.createElementNS(this.svgns, `g`);

      let tick_line = document.createElementNS(this.svgns, `path`);
      tick_line.setAttribute(`d`, `M${this.dataspace.x},${(this.dataspace.y + this.dataspace.height) - (y_tick_distance * t)} H${this.dataspace.x - this.ticklength}`);
      tick_line.classList.add(`axis`);
      tick.appendChild(tick_line);

      let tick_label = document.createElementNS(this.svgns, `text`);
      tick_label.setAttribute(`x`, (this.dataspace.x - this.ticklength) - (this.font_size/4) );
      tick_label.setAttribute(`y`, (this.dataspace.y + this.dataspace.height) - (y_tick_distance * t) + (this.font_size * 0.3));
      tick_label.classList.add(`tick_label`);
      tick_label.textContent = y_tick_values[t];
      tick.appendChild(tick_label);

      y_axis.appendChild(tick);
    }

    this.root.appendChild(y_axis);
  }

  create_dataline(series, label, series_id) {
    //  create dataline group
    let dataline_group = document.createElementNS(this.svgns, `g`);
    dataline_group.id = label;
    dataline_group.classList.add(`dataline`, `series_${series_id}`);

    // create line
    const l_len = this.record_count;
    const x_tick_distance = this.single_precision(this.dataspace.width / (l_len - 1));

    let dataline = document.createElementNS(this.svgns, `path`);
    let moveto = true;
    let d = ``;
    let y_pos = 0;
    for (let l = 0; l_len > l; ++l) {
      let val = series[l];
      if (`` === val || isNaN(val)) {
        moveto = true;
      } else {
        y_pos = (this.dataspace.y + this.dataspace.height) - (this.single_precision(this.dataspace.height / (this.max / val)));
        let command = moveto ? `M` : `L`;
        d += `${command}${this.dataspace.x + (x_tick_distance * l)},${y_pos}`;
        moveto = false;
      }

    }
    dataline.setAttribute(`d`, d);
    dataline_group.appendChild(dataline);

    let dataline_label = document.createElementNS(this.svgns, `text`);
    dataline_label.setAttribute(`x`, (this.dataspace.x + this.dataspace.width) + 5 );
    dataline_label.setAttribute(`y`, y_pos + (this.font_size * 0.3));
    dataline_label.textContent = label;
    dataline_group.appendChild(dataline_label);

    this.root.appendChild(dataline_group);
  }

  hilite_by_id( id_arr, is_hide ) {
    let classname = is_hide ? `hide` : `lowlite`;

    const datalines = document.querySelectorAll(`.dataline`);
    if (!id_arr) {
      for (const dataline of datalines) {
        dataline.classList.remove(classname);
      }
    } else {
      for (const dataline of datalines) {
        dataline.classList.add(classname);
      }

      for (const id of id_arr) {
        const dataline = document.getElementById(id);
        dataline.classList.remove(classname);
      }
    }
  }
}
