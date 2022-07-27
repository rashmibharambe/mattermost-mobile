// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {useIntl} from 'react-intl';

import FormattedText from '@components/formatted_text';
import {useTheme} from '@context/theme';
import {t} from '@i18n';
import {makeStyleSheetFromTheme} from '@utils/theme';
import {typography} from '@utils/typography';

import SettingBlock from '../setting_block';
import SettingOption from '../setting_option';
import SettingSeparator from '../settings_separator';

const headerText = {
    id: t('notification_settings.send_notification.about'),
    defaultMessage: 'Notify me about...',
};
const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        disabled: {
            color: theme.centerChannelColor,
            paddingHorizontal: 15,
            paddingVertical: 10,
            ...typography('Body', 200, 'Regular'),
        },
    };
});

type MobileSendPushProps = {
    pushStatus: PushStatus;
    sendPushNotifications: boolean;
    setMobilePushPref: (status: PushStatus) => void;
}
const MobileSendPush = ({sendPushNotifications, pushStatus, setMobilePushPref}: MobileSendPushProps) => {
    const theme = useTheme();
    const styles = getStyleSheet(theme);
    const intl = useIntl();

    return (
        <SettingBlock
            headerText={headerText}
        >
            {sendPushNotifications &&
                <>
                    <SettingOption
                        action={setMobilePushPref}
                        label={intl.formatMessage({id: 'notification_settings.pushNotification.all_new_messages', defaultMessage: 'All new messages'})}
                        selected={pushStatus === 'all'}
                        testID='notification_settings.pushNotification.allActivity'
                        type='select'
                        value='all'
                    />
                    <SettingSeparator/>
                    <SettingOption
                        action={setMobilePushPref}
                        label={intl.formatMessage({id: 'notification_settings.pushNotification.mentions.only', defaultMessage: 'Mentions, direct messages only(default)'})}
                        selected={pushStatus === 'mention'}
                        testID='notification_settings.pushNotification.onlyMentions'
                        type='select'
                        value='mention'
                    />
                    <SettingSeparator/>
                    <SettingOption
                        action={setMobilePushPref}
                        label={intl.formatMessage({id: 'notification_settings.pushNotification.nothing', defaultMessage: 'Nothing'})}
                        selected={pushStatus === 'none'}
                        testID='notification_settings.pushNotification.never'
                        type='select'
                        value='none'
                    />
                </>
            }
            {!sendPushNotifications &&
                <FormattedText
                    defaultMessage='Push notifications for mobile devices have been disabled by your System Administrator.'
                    id='notification_settings.pushNotification.disabled_long'
                    style={styles.disabled}
                />
            }
        </SettingBlock>
    );
};

export default MobileSendPush;