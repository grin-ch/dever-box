import { shuffle } from "lodash";

class Mesh {
  status: number; // 0: 未打开, 1:打开, 2:标记, 3: 问号
  value: number; // 0-8
  isMine: boolean;

  constructor(isMine: boolean) {
    this.isMine = isMine;
    this.value = 0;
    this.status = 0;
  }
  setValue(value: number) {
    this.value = value;
  }
  open() {
    this.status = 1;
  }
  flag() {
    let num = 0;
    switch (this.status) {
      case 0:
        this.status = 2;
        num++;
        break;
      case 2:
        this.status = 3;
        num--;
        break;
      case 3:
        this.status = 0;
        break;
    }
    return num;
  }

  isBack() {
    return this.status == 0;
  }
  isOpen() {
    return this.status == 1;
  }
  isFlag() {
    return this.status == 2;
  }
  isUnKnow() {
    return this.status == 3;
  }
  isZero() {
    return this.value == 0;
  }
}

class MineBoard {
  status: number; // 0:进行中, 1:失败, 2:胜利
  width: number;
  hight: number;
  meshTotal: number; // 总格子数
  meshRemain: number; // 剩余格子
  flagNum: number; // 标记数量
  list: Mesh[][];

  constructor(width: number, hight: number, total: number) {
    this.width = width;
    this.hight = hight;
    this.meshTotal = total;
    this.status = 0;
    this.meshRemain = 0;
    this.meshRemain = width * hight;
    this.flagNum = 0;
    this.list = [];
    this.initBoard();
  }
  // 初始化游戏网格
  initBoard() {
    let that = this;
    let ml: Mesh[][] = [];
    let n = that.meshTotal;
    let allList: Mesh[] = [];
    for (let i = 0; i < that.width; i++) {
      for (let j = 0; j < that.hight; j++) {
        allList.push(new Mesh(n > 0));
        n--;
      }
    }
    allList = shuffle(allList);
    for (let i = 0; i < that.hight; i++) {
      let list: Mesh[] = [];
      for (let j = 0; j < that.width; j++) {
        list.push(allList[i * that.width + j]);
      }
      ml.push(list);
    }
    that.list = ml;

    for (let i = 0; i < that.hight; i++) {
      for (let j = 0; j < that.width; j++) {
        that.calcMineNumber(j, i);
      }
    }
  }
  // 计算方格周围的地雷数量
  calcMineNumber(x: number, y: number) {
    let that = this;
    if (that.list[y][x].isMine) return;

    let count = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= that.width || i < 0 || j >= that.hight || j < 0) continue;
        if (i == x && j == y) continue;
        if (that.list[j][i].isMine) count++;
      }
    }
    that.list[y][x].setValue(count);
  }

  // 翻面
  turnOver(x: number, y: number) {
    if (this.status != 0) return;
    if (x >= this.width || x < 0 || y >= this.hight || y < 0) return;
    let item = this.list[y][x];
    if (!item.isBack()) {
      return;
    }
    item.open();
    if (item.isMine) {
      this.status = 1;
      window.$message.error("你输了");
      return;
    }

    this.meshRemain--;
    if (item.isZero()) {
      this.turnNext(x + 1, y);
      this.turnNext(x - 1, y);
      this.turnNext(x, y + 1);
      this.turnNext(x, y - 1);
    }
    if (this.meshRemain <= this.meshTotal) {
      this.status = 2;
      window.$message.info("你赢了");
    }
  }
  turnNext(x: number, y: number) {
    if (x >= this.width || x < 0 || y >= this.hight || y < 0) return;
    let item = this.list[y][x];
    if (item.isOpen() || item.isMine) {
      return;
    }
    item.open();
    this.meshRemain--;
    if (item.isZero()) {
      this.turnNext(x + 1, y);
      this.turnNext(x - 1, y);
      this.turnNext(x, y + 1);
      this.turnNext(x, y - 1);
    }
  }
  // 标记
  flag(x: number, y: number) {
    if (this.status != 0) return;
    if (x >= this.width || x < 0 || y >= this.hight || y < 0) return;

    this.flagNum += this.list[y][x].flag();
  }
}

export type { Mesh };
export { MineBoard };
