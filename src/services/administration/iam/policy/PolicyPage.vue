<template>
    <section>
        <p-heading
            :title="$t('IAM.POLICY.POLICY')"
            use-total-count
            :total-count="policyStore.state.totalCount"
        >
            <template #extra>
                <p-button style-type="primary"
                          icon-left="ic_plus_bold"
                          :disabled="!state.hasManagePermission"
                          @click="$router.push({ name: ADMINISTRATION_ROUTE.IAM.POLICY.CREATE._NAME })"
                >
                    {{ $t('PLUGIN.COLLECTOR.MAIN.CREATE') }}
                </p-button>
            </template>
        </p-heading>
        <policy-list-data-table hide-anchor-icon />
    </section>
</template>

<script setup lang="ts">
import {
    reactive,
} from 'vue';

import { PHeading, PButton } from '@spaceone/design-system';

import { useManagePermissionState } from '@/common/composables/page-manage-permission';

import PolicyListDataTable from '@/services/administration/modules/PolicyListDataTable.vue';
import { ADMINISTRATION_ROUTE } from '@/services/administration/route-config';
import { usePolicyStore } from '@/services/administration/store/policy-page-store';

const policyStore = usePolicyStore();

const state = reactive({
    hasManagePermission: useManagePermissionState(),
});
</script>
