<script setup>
  import { calendarTableHeader } from './config';
  import { getLunar } from 'chinese-lunar-calendar';
  import dayjs from 'dayjs';
  import { fillZero } from './utils';

  const emits = defineEmits(['pick']);

  const props = defineProps({
    step: {
      type: Number,
      default: 0,
    },
  });
  const { step } = toRefs(props);

  const dateList = computed(() => {
    const currentDate = dayjs().add(step.value, 'month');
    // const currentDate = dayjs().add('2022-09-15', 'YYYY-MM-DD', 'month');

    // 定义每个月的天数，如果是闰年第二月改为29天
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((currentDate.$y % 4 === 0 && currentDate.$y % 100 !== 0) || currentDate.$y % 400 === 0) {
      daysInMonth[1] = 29;
    }

    const currentMonth = dayjs(`${currentDate.$M + 1}-1-${currentDate.$y}`, 'M-D-YYYY'); // 当前月份的第一天
    let currentFirstDay = currentMonth.day(); // 当前月份的第一天的星期
    currentFirstDay = currentFirstDay || 7; // 如果是星期天则为 7
    const lastDate = currentMonth.subtract(1, 'day').date(); // 上一个月最后一天
    // 渲染主体
    const renderMain = [];

    // 当前月份一共有多少天
    const fullDays = daysInMonth[currentDate.month()];

    // 初始化当前的月份中的天数
    for (let i = 1; i <= 42; i++) {
      const content = i > fullDays ? i - fullDays : i;
      const dayjs = i > fullDays ? currentDate.add(1, 'month') : currentDate;

      const dateObj = {
        dayjs,
        type: i > fullDays ? 'prev' : 'normal',
        content,
        lunar: getLunar(dayjs.year(), dayjs.month() + 1, content),
      };

      if (currentFirstDay === 1) {
        // 第一天为星期一
        renderMain.push(dateObj);
      } else {
        renderMain[currentFirstDay - 2 + i] = dateObj;
      }
    }
    // 剪切多于项
    renderMain.length = 42;

    // 当前月的第一天不是星期一，补全前面的天数
    if (currentFirstDay !== 1) {
      for (let i = currentFirstDay - 1; i > 0; i--) {
        renderMain[i - 1] = {
          dayjs: currentDate.add(-1, 'month'),
          type: 'prev',
          content: lastDate + i + 1 - currentFirstDay,
          lunar: getLunar(
            currentDate.add(-1, 'month').year(),
            currentDate.add(-1, 'month').month() + 1,
            lastDate + i + 1 - currentFirstDay
          ),
        };
      }
    }

    // 添加唯一标识
    renderMain.forEach((item) => {
      item.id = getFormattedDate(item);
    });

    const dateList = [];
    for (let i = 0; i < 6; i++) {
      const column = renderMain.slice(i * 7, i * 7 + 7);
      dateList.push(column);
    }

    return dateList;
  });

  const getFormattedDate = (dateInfo) => {
    const date = `${dateInfo.dayjs.$y}-${fillZero(dateInfo.dayjs.$M + 1)}-${fillZero(
      dateInfo.content
    )}`;
    return date;
  };

  const selectedDay = ref('');
  const handlePickDay = (cell) => {
    const date = getFormattedDate(cell);
    selectedDay.value = date;
    emits('pick', date);
  };

  const getClasses = (cell) => {
    const classes = [];
    classes.push(cell.type === 'normal' ? 'normal-date' : 'prev-date');
    classes.push(
      cell.dayjs.year() === dayjs(new Date()).year() &&
        cell.dayjs.month() === dayjs(new Date()).month() &&
        cell.content === dayjs(new Date()).date()
        ? 'current-day'
        : ''
    );

    classes.push(cell.id === selectedDay.value ? 'focus-day' : '');
    return classes;
  };
</script>

<template>
  <table>
    <thead>
      <th v-for="item in calendarTableHeader" :key="item">{{ item }}</th>
    </thead>
    <tbody>
      <tr v-for="(col, i) in dateList" :key="i">
        <td
          v-for="(cell, j) in col"
          :key="j"
          :class="getClasses(cell)"
          @click="handlePickDay(cell)"
        >
          <div class="wordnew">{{ cell.content }}</div>
          <div class="wordold">{{ cell.lunar.dateStr.slice(-2) }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  td {
    text-align: center;
    /* margin: 6px; */
    padding: 9px 11px;
    font-size: 13px;
    border-radius: 50%;
    border: 1px solid #eff0f0;
  }
  .wordold {
    font-size: 13px;
  }
  .wordnew {
    font-size: 15px;
  }
  td:hover {
    background-color: #cdcdcdc9;
  }
  /* 本月的日期 */
  .normal-date {
    color: #000;
  }

  /* 不是本月的日期 */
  .prev-date {
    color: #ccc;
  }

  /* 实际日期的当天 */
  .current-day {
    background-color: rgb(133, 133, 180) !important;
  }

  /* 被选中的日期 */
  .focus-day {
    border: 1px solid rgb(0, 145, 73);
  }
</style>
