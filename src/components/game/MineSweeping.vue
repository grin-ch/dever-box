<template>
  <n-card>
    <n-layout has-sider>
      <!-- 侧边栏 -->
      <n-layout-sider class="mesh-info" width="90">
        <n-space :vertical="true">
          <!-- 统计栏 -->
          <n-gradient-text class="title" type="success">
            剩余方块
          </n-gradient-text>
          <n-tag class="status" type="info">
            <template #icon>
              <n-icon><Alarm /></n-icon>
            </template>
            {{ timeCost }}
          </n-tag>
          <n-tag class="status" type="error">
            <template #icon>
              <n-icon><Skull /></n-icon>
            </template>
            {{ meshTotal }}
          </n-tag>
          <n-tag class="status" type="warning">
            <template #icon>
              <n-icon><Golf /></n-icon>
            </template>
            {{ flagNum }}
          </n-tag>
          <n-tag class="status" type="success">
            <template #icon>
              <n-icon><Square /></n-icon>
            </template>
            {{ meshRemain }}
          </n-tag>
          <!-- 参数项 -->
          <n-gradient-text class="title" type="info">
            参数设置
          </n-gradient-text>
          <n-input-number
            class="status number"
            size="small"
            placeholder="宽度"
            :show-button="false"
            :value="width"
            :min="10"
            :max="40"
          />
          <n-input-number
            class="status number"
            size="small"
            placeholder="高度"
            :show-button="false"
            :value="heigth"
            :min="10"
            :max="30"
          />
          <n-input-number
            class="status number"
            size="small"
            placeholder="地雷"
            :show-button="false"
            :value="num"
            :min="10"
            :max="1099"
          />
          <n-button
            class="status reset"
            tertiary
            type="warning"
            @click="randomBoard()"
            >随机难度</n-button
          >
          <n-button
            class="status reset"
            tertiary
            type="info"
            @click="resetBoard()"
            >重新开始</n-button
          >
        </n-space>
      </n-layout-sider>

      <!-- 游戏板块 -->
      <n-layout-content class="mesh-board">
        <div class="mine-list" v-for="(list, y) in data.board.list">
          <div
            class="mine-mesh"
            :class="{ active: data.board.status == 0 && item.status != 1 }"
            v-for="(item, x) in list"
            oncontextmenu="return false;"
            @click.left="data.board.turnOver(x, y)"
            @click.right="data.board.flag(x, y)"
          >
            <n-icon v-if="item.isOpen() && item.isMine"><Skull /></n-icon>
            <n-icon v-if="item.isFlag()"><Golf /></n-icon>
            <n-icon v-if="item.isUnKnow()"><Help /></n-icon>
            <n-icon v-if="item.isOpen() && !item.isMine && !item.isZero()">{{
              item.value
            }}</n-icon>
            <n-icon
              :class="{ openned: item.isOpen() }"
              v-if="item.isOpen() && !item.isMine && item.isZero()"
            ></n-icon>
          </div>
        </div>
      </n-layout-content>
    </n-layout>
  </n-card>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  NInputNumber,
  NGradientText,
  NButton,
  NIcon,
  NSpace,
  NTag,
  NCard,
  NLayout,
  NLayoutSider,
  NLayoutContent,
} from "naive-ui";
import {
  SkullOutline as Skull,
  GolfOutline as Golf,
  HelpOutline as Help,
  SquareOutline as Square,
  AlarmOutline as Alarm,
} from "@vicons/ionicons5";
import { MineBoard } from "./MineSweeping";
import { computed } from "@vue/reactivity";
import { random } from "lodash";

const gameArg = withDefaults(
  defineProps<{
    width: number;
    heigth: number;
    num: number;
  }>(),
  {
    width: 10,
    heigth: 10,
    num: 10,
  }
);
let width = ref(gameArg.width);
let heigth = ref(gameArg.heigth);
let num = ref(gameArg.num);

const argCheck = function () {
  if (width.value < 10) width.value = 10;
  if (width.value > 40) width.value = 40;
  if (heigth.value < 10) heigth.value = 10;
  if (heigth.value > 30) heigth.value = 30;
  if (num.value < 10) num.value = 10;
  if (num.value > width.value * heigth.value - 1) {
    width.value * heigth.value - 1;
  }
};
argCheck();

const timeCost = ref(0);
let timeFlag = <number | undefined>undefined;
const data = reactive({
  board: new MineBoard(width.value, heigth.value, num.value),
});

timeFlag = window.setInterval(function () {
  timeCost.value++;
}, 1000);
const resetBoard = function () {
  argCheck();
  window.clearInterval(timeFlag);
  data.board = reactive(new MineBoard(width.value, heigth.value, num.value));
  timeCost.value = 0;
  timeFlag = window.setInterval(function () {
    timeCost.value++;
  }, 1000);
};

const randomBoard = function () {
  width.value = random(10, 40);
  heigth.value = random(10, 30);
  num.value = random(10, width.value * heigth.value);
  resetBoard();
};

const flagNum = computed(() => data.board.flagNum);
const meshTotal = computed(() => data.board.meshTotal);
const meshRemain = computed(() => data.board.meshRemain);
</script>

<style scope>
.mesh-info .title {
  margin-left: -36px;
}
.mesh-info .status {
  width: 75px;
  height: 28px;
}

.mesh-info .number {
  padding: 0px;
  margin-left: 7px;
  width: 76px;
}
.mesh-info .reset {
  padding: 0px;
  font-size: 6px;
}

.mesh-board {
  margin-left: 20px;
}

.mine-list {
  margin: 0px;
  padding: 0px;
  height: 20px;
  line-height: 20px;
}

.mine-list .active:hover {
  background-color: rgb(200, 200, 200);
}

.mine-mesh {
  margin: 0px;
  padding: 0px;
  float: left;
  width: 18px;
  height: 18px;
  text-align: center;
  border: solid 1px;
  border-color: rgb(158, 158, 158);
  background-color: rgb(230, 230, 230);
}
.mine-mesh .openned {
  background-color: aliceblue;
}
</style>
