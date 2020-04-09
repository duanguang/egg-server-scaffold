interface IOrderBy {
  columnName: string;
  orderBy: string;
  seqNo: number;
}

export interface ICustomSchedule {
  checkAll: boolean;
  cusVersion: boolean;
  declCurr: boolean;
  disMerge: boolean;
  docNo: boolean;
  element: boolean;
  endCountry: boolean;
  extField1: boolean;
  extField2: boolean;
  gdsSeqno: boolean;
  gmodel: boolean;
  ids: [];
  itemNo: boolean;
  legal: boolean;
  name: null;
  orderBy: IOrderBy[];
  orgCountry: boolean;
  recordNo: string;
  splitBoxNo: null;
  splitHouseBillNo: null;
  splitMemo: null;
  splitNum: number;
  splitTransportVoyageNo: null;
  transportVoyageNo: boolean;
  unit: null;
  unitPrice: boolean;
  useSplit: boolean;
}
