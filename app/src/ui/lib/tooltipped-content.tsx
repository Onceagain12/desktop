import * as React from 'react'
import { ITooltipProps, Tooltip } from './tooltip'
import { createObservableRef } from './observable-ref'

/**
 * ITooltippedContentProps is a superset of ITooltipProps but does not
 * define the `target` prop as that's set programatically in render
 */
interface ITooltippedContentProps
  extends Omit<ITooltipProps<HTMLElement>, 'target'> {
  /** The tooltip contents */
  readonly tooltip: JSX.Element | string | undefined

  /** The wrapper element tag name, defaults to span */
  readonly tagName?: keyof HTMLElementTagNameMap

  /**
   * An optional additional class name to set on the tooltip in order to be able
   * to apply specific styles to the tooltip
   */
  readonly tooltipClassName?: string

  /** An optional class name to set on the wrapper element */
  readonly className?: string

  /** Open on target focus */
  readonly openOnFocus?: boolean
}

/**
 * A less complicated version of the Tooltip component for when it's acceptable
 * to add a wrapping element around the content. supports all the options that
 * the Tooltip component does without having to worry about refs.
 **/
export class TooltippedContent extends React.Component<ITooltippedContentProps> {
  private wrapperRef = createObservableRef<HTMLElement>()

  public render() {
    const { tooltip, tagName, children, className, tooltipClassName, ...rest } =
      this.props

    return React.createElement(tagName ?? 'span', {
      ref: this.wrapperRef,
      className: className,
      children: (
        <>
          {tooltip !== undefined && (
            <Tooltip
              target={this.wrapperRef}
              className={tooltipClassName}
              openOnFocus={this.props.openOnFocus}
              {...rest}
            >
              {tooltip}
            </Tooltip>
          )}
          {children}
        </>
      ),
    })
  }
}
