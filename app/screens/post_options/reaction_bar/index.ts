// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {of as of$} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {observeRecentReactions} from '@queries/servers/system';

import ReactionBar from './reaction_bar';

import type {WithDatabaseArgs} from '@typings/database/database';

const DEFAULT_EMOJIS = [
    'thumbsup',
    'smiley',
    'white_check_mark',
    'heart',
    'eyes',
    'raised_hands',
];

const mergeRecentWithDefault = (recentEmojis: string[]) => {
    const filterUsed = DEFAULT_EMOJIS.filter((e) => !recentEmojis.includes(e));
    return recentEmojis.concat(filterUsed).splice(0, 6);
};

const enhanced = withObservables([], ({database}: WithDatabaseArgs) => ({
    recentEmojis: observeRecentReactions(database).
        pipe(
            switchMap((recent) => of$(mergeRecentWithDefault(recent))),
        ),
}));

export default withDatabase(enhanced(ReactionBar));