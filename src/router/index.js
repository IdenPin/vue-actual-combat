import Vue from 'vue';
import Router from 'vue-router';
import mainMenu from '@/components/main-menu/main-menu';
// 成绩分析
import scoreAnalysis from '@/components/score-analysis/score-analysis';
// 录取率预测
import acceptRate from '@/components/accept-rate/accept-rate';
// 院校信息列表
import schoolList from '@/components/school-list/school-list';
// 院校信息详情
import schoolDetail from '@/components/school-detail/school-detail';

import schoolIntro from '@/components/school-detail/school-intro';
import openProfessional from '@/components/school-detail/open-professional';

import enrollmentPlan from '@/components/school-detail/enrollment-plan';
import admissionStatus from '@/components/school-detail/admission-status';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainMenu',
      component: mainMenu
    }, {
      path: '/scoreAnalysis',
      name: 'scoreAnalysis',
      component: scoreAnalysis
    }, {
      path: '/acceptRate',
      name: 'acceptRate',
      component: acceptRate
    }, {
      path: '/schoolList',
      name: 'schoolList',
      component: schoolList
    }, {
      path: '/schoolIntro',
      name: 'schoolDetail',
      component: schoolDetail,
      children: [
        {
          path: '/schoolIntro',
          component: schoolIntro,
          name: 'schoolIntro'
        }, {
          path: '/openProfessional',
          component: openProfessional,
          name: 'openProfessional'
        }, {
          path: '/enrollmentPlan',
          component: enrollmentPlan,
          name: 'enrollmentPlan'
        }, {
          path: '/admissionStatus',
          component: admissionStatus,
          name: 'admissionStatus'
        }
      ]
    }
  ],
  // 设置a标签高亮的active
  linkActiveClass: 'v-active'
});
