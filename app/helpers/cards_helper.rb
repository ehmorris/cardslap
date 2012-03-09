module CardsHelper
  def is_string_image? str
    uri = URI.parse(str)
    # if the string is a url, assume it's an image
    return %w(http https).include?(uri.scheme)
  # if URI.parse raises an invalid error, return false
  rescue URI::InvalidURIError
    return false
  end
end
