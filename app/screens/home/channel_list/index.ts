// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {of as of$} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {queryAllMyChannelsForTeam} from '@queries/servers/channel';
import {observeCurrentTeamId, observeLicense} from '@queries/servers/system';
import {queryMyTeams} from '@queries/servers/team';
import {observeIsCRTEnabled} from '@queries/servers/thread';

import ChannelsList from './channel_list';

import type {WithDatabaseArgs} from '@typings/database/database';

const enhanced = withObservables([], ({database}: WithDatabaseArgs) => ({
    isCRTEnabled: observeIsCRTEnabled(database),
    teamsCount: queryMyTeams(database).observeCount(false),
    channelsCount: observeCurrentTeamId(database).pipe(
        switchMap((id) => (id ? queryAllMyChannelsForTeam(database, id).observeCount() : of$(0))),
    ),
    isLicensed: observeLicense(database).pipe(
        switchMap((lcs) => (lcs ? of$(lcs.IsLicensed === 'true') : of$(false))),
    ),
}));

export default withDatabase(enhanced(ChannelsList));
