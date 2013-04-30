module CardsHelper
  def is_string_image_extension? str
    return ['jpeg', 'jpg', 'png', 'gif', 'webp'].include? str
  end

  def is_string_image? str
    uri = URI.parse(str)
    # if string is a url and ends in an image extension, assume it's an image
    return %w(http https).include?(uri.scheme) &&
           is_string_image_extension?(uri.path.rpartition('.').last)

  # if URI.parse raises an invalid error, return false
  rescue URI::InvalidURIError
    return false
  end
end
