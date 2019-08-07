import vue from 'vue';

export default class VueArms {
  public config: object;
  public pipe: any[];
  constructor(config: object, useEnvs?: string[]);
  public install(Vue: typeof vue, options?: object): void;
}
