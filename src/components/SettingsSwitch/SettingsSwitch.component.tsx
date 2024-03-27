import { Row, Col, Switch, Tooltip, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import cn from 'classnames';
import { TooltipPlacement } from 'antd/es/tooltip';

const { Text } = Typography;

type SettingsSwitchProps = {
    label: string;
    switchDataTestId: string;
    iconDataTestId: string;
    tooltip?: string;
    defaultChecked?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
    overlayClassName?: string;
    placement?: TooltipPlacement;
};

export const SettingsSwitchComponent = ({
    label,
    tooltip,
    defaultChecked,
    onChange,
    disabled,
    overlayClassName,
    placement,
    switchDataTestId,
    iconDataTestId,
}: SettingsSwitchProps) => {
    return (
        <Row className={styles.switchWrapper} justify='space-between' align='middle' wrap={false}>
            <Col
                className={cn(styles.switchTextCol, disabled ? styles.disabledSwitchTextCol : null)}
            >
                <Text>{label}</Text>
                {tooltip && (
                    <Tooltip
                        overlayClassName={cn(
                            styles.settingTooltip,
                            overlayClassName,
                            placement !== 'topRight' ? styles.notTopRightTooltip : null,
                        )}
                        placement={placement}
                        title={tooltip}
                        arrowPointAtCenter
                    >
                        <ExclamationCircleOutlined
                            className={styles.switchTextColIcon}
                            data-test-id={iconDataTestId}
                        />
                    </Tooltip>
                )}
            </Col>
            <Col>
                <Switch
                    className={styles.switch}
                    defaultChecked={defaultChecked}
                    onChange={onChange}
                    disabled={disabled}
                    data-test-id={switchDataTestId}
                />
            </Col>
        </Row>
    );
};
